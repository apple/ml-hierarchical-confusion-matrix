<!--
For licensing see accompanying LICENSE file.

Copyright (C) 2022 Apple Inc. All Rights Reserved.
-->

<script lang="ts">
    import { toMapping, toStatistic } from '../view';
    import type { Statistic } from '../view';
    import { currentCell } from './stores';
    import CellBlank from './CellBlank.svelte';
    import CellColor from './CellColor.svelte';
    import CellSquare from './CellSquare.svelte';
    import CellStat from './CellStat.svelte';
    import CellZero from './CellZero.svelte';
    import Label from './Label.svelte';
    import LegendSize from './LegendSize.svelte';
    import LegendColor from './LegendColor.svelte';
    import { layoutClassic } from '../layout';
    import type { Entry } from '../matrix';
    import { spec } from './stores';
    import { buildMatrix } from '../confusions';
    import type { Measure } from '../specification';

    // Encoding
    export let cellSize = 18;
    export let hierarchyExtent = 150;
    export let hierarchyIndent = 14;
    export let statisticsWidth = 60;
    export let statisticsPadding = 10;

    const padding = 4;
    const axisTitle = 30;

    // Required props
    export let confusions = null;

    $: matrix = buildMatrix($spec, confusions);
    $: hierarchy = matrix.axis;
    $: columns = ($spec.measures ? $spec.measures.map((m: Measure) => toStatistic(matrix, m)) : []) as Array<Statistic> ;

    $: layout = layoutClassic((n: Entry) => !$spec.collapsed.includes(n.data.id), hierarchy);

    $: isFrontier = (entry: Entry) => entry.isLeaf() || $spec.collapsed.includes(entry.data.id);

    $: statisticsExtent = columns.length * statisticsWidth;

    // TODO: Consider creating a "factory component" that does these computations
    $: confusionsExtent = layout.length * cellSize;

    $: totalExtent = padding
        + axisTitle
        + hierarchyExtent
        + confusionsExtent
        + statisticsPadding
        + statisticsExtent
        + columns.length * padding
        + padding;

    // TODO: Remove full pass over nodes!
    // TODO: Split row/col to enable hovering over labels too
    // TODO: Don't draw many empty rectangles but larger ones spanning entire rows/columns
    //       and bubble events through them
    $: highlightRow = layout.find((n) => ($currentCell ? n.node === $currentCell[0] : false));
    $: highlightCol = layout.find((n) => ($currentCell ? n.node === $currentCell[1] : false));

    $: mapping = toMapping(matrix, new Set($spec.collapsed), $spec.normalization);

    $: height = totalExtent - statisticsExtent - statisticsPadding;

    function clearFilter() {
        $spec.filter = [];
        $spec = $spec;
    }
</script>

<style>
    .hover {
        fill: #fef0d6;
    }

    .axisTitle {
        font-weight: bold;
    }

    .highlight {
        font-weight: 600;
    }

    .hover {
        margin-top: 20px;
        background-color: #f5f5f5;
    }

    .breadcrumb {
        cursor: pointer;
        font-weight: bold;
    }

    .breadcrumb:hover {
        text-decoration: underline;
    }
</style>

<div class="box hover">
    {#if $currentCell}
    <span class="highlight">{$currentCell[0].data.name.substring(0, 21)}</span> was labeled as <span class="highlight">{$currentCell[1].data.name.substring(0, 21)}</span>
    in <span class="highlight">{matrix.frequency($currentCell[0], $currentCell[1])}</span> instances.
    {:else}Hover over cells to show more information.{/if}
</div>

<svg width={totalExtent} {height}>

    <g transform="translate({padding + axisTitle},{padding + axisTitle})">
        {#if $spec.filter?.length > 0}
        <text class="breadcrumb" on:click={clearFilter} on:keydown={clearFilter} y="120">{'< go back'}</text>
        {/if}

        <g transform="translate(0,0)">
            <text class="axisTitle">{$spec.normalization === 'total' ? 'Counts' : `${$spec.normalization} Probabilities`}</text>
            <g transform="translate(0,{cellSize})">
                {#if $spec.encoding === 'color'}
                   <LegendColor scale={mapping.scale()} {cellSize} />
                {:else if $spec.encoding === 'size'}
                    <LegendSize scale={mapping.scale()} {cellSize} />
                {/if}
            </g>
            <!--<svelte:component this={legend} scale={mapper.scale} {cellSize} />-->
        </g>

        {#if highlightRow}
            <rect
                class="hover"
                x={0}
                y={highlightRow.pos[1] * cellSize + hierarchyExtent}
                width={totalExtent - 2 * padding}
                height={cellSize} />
        {/if}
        {#if highlightCol}
            <rect
                class="hover"
                x={highlightCol.pos[1] * cellSize + hierarchyExtent}
                y={0}
                width={cellSize}
                height={totalExtent - 2 * padding} />
        {/if}

        <!-- X axis -->
        <text text-anchor="middle" class="axisTitle" transform="translate({hierarchyExtent + confusionsExtent / 2},0)">Observed</text>
        {#each layout as { node: predict, pos: predictPos }}
            <g
                transform="translate({predictPos[1] * cellSize + cellSize / 2 + hierarchyExtent},{hierarchyExtent - predictPos[0] * hierarchyIndent})">
                <g transform="rotate(-90)">
                    <Label node={predict} direction={1} />
                </g>
            </g>
        {/each}

        <!-- Y axis -->
        <text text-anchor="middle" class="axisTitle" transform="translate({- axisTitle / 2},{hierarchyExtent + confusionsExtent / 2}) rotate(-90)">Actual</text>
        <g transform="translate(0,{hierarchyExtent})">
            {#each layout as { node: actual, pos: actualPos, span }}
                <g
                    transform="translate({actualPos[0] * hierarchyIndent},{actualPos[1] * cellSize + cellSize / 2})">
                    {#if span > 0}
                    <line x1="0.3em" x2="0.3em" y1={cellSize / 2} y2={span * cellSize + cellSize / 2} stroke={actual.children.find(n => $currentCell && n.data.id === $currentCell[0].data.id) ? 'black' : '#cccccc'} />
                    {/if}
                    <Label node={actual} direction={0} />
                </g>
            {/each}
        </g>

        <g transform="translate({hierarchyExtent},{hierarchyExtent})">
            {#each layout as { node: actual, pos: actualPos }}
                <g transform="translate(0,{actualPos[1] * cellSize})">
                    {#each layout as { node: predict, pos: predictPos }}
                        {#if !isFrontier(predict) || !isFrontier(actual)}
                            <CellBlank
                                x={predictPos[1] * cellSize}
                                {actual}
                                {predict}
                                {cellSize} />
                        {:else if matrix.frequency(actual, predict) === 0}
                            <CellZero
                                x={predictPos[1] * cellSize}
                                {actual}
                                {predict}
                                {cellSize} />
                        {:else if $spec.encoding === 'color'}
                            <CellColor
                                x={predictPos[1] * cellSize}
                                {actual}
                                {predict}
                                {cellSize}
                                value={mapping.value(actual, predict)} />
                        {:else if $spec.encoding === 'size'}
                            <CellSquare
                                x={predictPos[1] * cellSize}
                                {actual}
                                {predict}
                                {cellSize}
                                value={mapping.value(actual, predict)}
                                color="rgb(26,133,255)" />
                        {/if}
                    {/each}
                </g>
            {/each}
        </g>

        <g
            transform="translate({hierarchyExtent + confusionsExtent + statisticsPadding},{hierarchyExtent})">
            {#each columns as statistic, i}
                <g transform="translate({i * (statisticsWidth + padding)})">
                    <text y={-cellSize / 2}>{statistic.name()}</text>
                    {#each layout as { node: row, pos: rowPos }}
                        <g transform="translate(0,{rowPos[1] * cellSize})">
                            <CellStat columnWidth={statisticsWidth} {cellSize} statistic={statistic.value(row)} />
                        </g>
                    {/each}
                </g>
            {/each}
        </g>
    </g>
</svg>
