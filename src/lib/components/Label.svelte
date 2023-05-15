<!--
For licensing see accompanying LICENSE file.

Copyright (C) 2022 Apple Inc. All Rights Reserved.
-->

<script lang="ts">
    import { currentCell } from './stores';
    import { spec } from './stores';

    export let node = null;
    export let truncateText = 25;

    // TODO: Find a nicer way to differentiate between actual/predicted
    export let direction = null;

    function truncate(str: string) {
        return str.length > truncateText ? str.substring(0, truncateText) : str;
    }

    function expand() {
        const index = $spec.collapsed.indexOf(node.data.id);
        if (index > -1) {
            $spec.collapsed.splice(index, 1);
            $spec = $spec;
        }
    }

    function collapse() {
        $spec.collapsed.push(node.data.id);
        $spec = $spec;
    }

    function clear() {
        const filterSet = new Set($spec.filter);
        filterSet.delete(node.data.id);
        $spec.filter = [...filterSet];
        $spec = $spec;
    }

    function filter() {
        if (!$spec.filter || $spec.filter.length === 0) {
            $spec.filter = [node.data.id];
        } else {
            const filterSet = new Set($spec.filter);
            filterSet.add(node.data.id);
            $spec.filter = [...filterSet];
        }
        $spec = $spec;
    }
</script>

{#if node.isLeaf()}
    <text
        dominant-baseline="middle"
        style="cursor: default;"
        class={$currentCell && $currentCell[direction] === node ? 'label active' : 'label'}
    >
        {truncate(node.data.name)}
    </text>
{:else if $spec.collapsed.includes(node.data.id)}
    <text
        dominant-baseline="middle"
        style="cursor: pointer;"
        on:click={expand}
        on:keydown={expand}
        class={$currentCell && $currentCell[direction] === node ? 'label active' : 'label'}
    >
        <tspan dominant-baseline="middle" class="collapseIcon">{'>'}</tspan>
        {truncate(node.data.name)}
    </text>
{:else}
    <text
        dominant-baseline="middle"
        style="cursor: pointer;"
        class={$currentCell && $currentCell[direction] === node ? 'label active' : 'label'}
    >
        <tspan on:click={collapse} on:keydown={collapse}>
            <tspan dominant-baseline="middle" class="collapseIcon">⋁</tspan>
            <tspan dominant-baseline="middle" x="10">
                {truncate(node.data.name)}
            </tspan>
        </tspan>
        {#if $spec.filter?.includes(node.data.id)}
            <tspan dominant-baseline="middle" on:click={clear} on:keydown={clear}> ❌ </tspan>
        {:else}
            <tspan y="2" on:click={filter} on:keydown={filter}> 🔎 </tspan>
        {/if}
    </text>
{/if}

<style>
    .label {
        font-size: 12px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
            sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
        text-rendering: optimizeLegibility;
    }

    .active {
        font-weight: bold;
    }

    .collapseIcon {
        fill: #dddddd;
        stroke: #dddddd;
    }
</style>
