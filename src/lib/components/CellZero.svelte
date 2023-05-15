<!--
For licensing see accompanying LICENSE file.

Copyright (C) 2022 Apple Inc. All Rights Reserved.
-->

<script>
    import { currentCell } from './stores';

    export let x = 0;
    export let y = 0;

    export let actual = null;
    export let predict = null;

    export let cellSize = 10;

    function mouseover() {
        $currentCell = [actual, predict];
    }

    function mouseout() {
        // eslint-disable-next-line
        $currentCell = null;
    }
</script>

<line
    x1={x + (cellSize / 8) * 3}
    y1={y + (cellSize / 8) * 3}
    x2={x + (cellSize / 8) * 5}
    y2={y + (cellSize / 8) * 5}
    stroke="#eeeeee"
/>
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
