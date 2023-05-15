<!--
For licensing see accompanying LICENSE file.

Copyright (C) 2022 Apple Inc. All Rights Reserved.
-->

<script>
    import { scaleLinear } from 'd3-scale';
    import { format } from '../view';

    export let scale = d3.scaleLinear();
    export let cellSize = 10;

    const padding = 3;
    
    $: ticks = scale.ticks(5);

    // TODO: Reuse cells (once they are independent of nodes)
    const minWidth = 2;
    $: scaleSquare = scaleLinear().range([minWidth ** 2, cellSize ** 2]);
</script>

<style>
    .outline {
        fill: none;
        stroke: #eeeeee;
    }

    .label {
        font-size: 10px;
    }
</style>

{#each ticks as tick,i}
    <rect
        y={(cellSize - Math.sqrt(scaleSquare(scale(tick)))) / 2}
        x={i * (cellSize + padding) + (cellSize - Math.sqrt(scaleSquare(scale(tick)))) / 2}
        height={Math.sqrt(scaleSquare(scale(tick)))}
        width={Math.sqrt(scaleSquare(scale(tick)))}
        fill='rgb(26,133,255)'
    />
    <rect
        class="outline"
        x={i * (cellSize + padding)}
        width={cellSize}
        height={cellSize}
    />
    <text dominant-baseline="middle" class="label" y={cellSize + cellSize / 2} x={i * (cellSize + padding) + cellSize / 2}>{format(tick, 1)}</text>
{/each}