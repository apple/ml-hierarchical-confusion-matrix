<!--
For licensing see accompanying LICENSE file.

Copyright (C) 2022 Apple Inc. All Rights Reserved.
-->

<script lang="ts">
    import { format } from '../view';
    import { scaleLinear } from 'd3-scale';
    import { scheme } from 'vega-scale';

    const interpolateColors = scheme('lighttealblue');

    export let scale = scaleLinear();
    export let cellSize = 10;

    const padding = 3;
    const numTicks = 4;

    const steps = 16;
    $: ticks = scale.ticks(numTicks);
</script>

<style>
    .label {
        font-size: 10px;
    }

    .outline {
        stroke: #eeeeee;
        pointer-events: all;
    }
</style>

<defs>
    <linearGradient id="legendRampGradient" x1="0" y1="0" x2="1" y2="0">
        {#each [...Array(steps).keys()] as s}
        <stop offset={s / steps} stop-color={interpolateColors(s / steps)} />
        {/each}
    </linearGradient>
</defs>

<rect class="outline" height={cellSize} width={ticks.length * (cellSize + padding)} fill="url(#legendRampGradient)" />

{#each ticks as tick, i}
    <text dominant-baseline="middle" class="label" y={cellSize + cellSize / 2} x={i * (cellSize + padding) + cellSize / 2}>{format(tick, 1)}</text>
{/each}
