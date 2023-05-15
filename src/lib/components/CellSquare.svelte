<!--
For licensing see accompanying LICENSE file.

Copyright (C) 2022 Apple Inc. All Rights Reserved.
-->

<script>
    import { currentCell } from './stores';
    import { scaleLinear } from 'd3-scale';

    export let x = 0;
    export let y = 0;

    export let actual = null;
    export let predict = null;
    export let value = null;

    export let color = 'rgb(0,0,0)';

    export let cellSize = 10;

    const minWidth = 2;
    const scale = scaleLinear().range([minWidth ** 2, cellSize ** 2]);
    $: sideLength = Math.sqrt(scale(value));

    $: cX = x + (cellSize - sideLength) / 2;
    $: cY = y + (cellSize - sideLength) / 2;

    function mouseover() {
        $currentCell = [actual, predict];
    }

    function mouseout() {
        // eslint-disable-next-line
        $currentCell = null;
    }
</script>

<rect x={cX} y={cY} width={sideLength} height={sideLength} fill={color} />
<rect
    on:mouseout={mouseout}
    on:blur={mouseout}
    on:mouseover={mouseover}
    on:focus={mouseover}
    class="outline"
    {x}
    {y}
    width={cellSize}
    height={cellSize}
/>

<style>
    .outline {
        fill: none;
        stroke: #eeeeee;
        pointer-events: all;
    }
</style>
