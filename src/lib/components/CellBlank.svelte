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

<rect
    on:mouseout={mouseout}
    on:blur={mouseout}
    on:mouseover={mouseover}
    on:focus={mouseover}
    {x}
    {y}
    width={cellSize}
    height={cellSize}
    fill="white"
    stroke="none"
    opacity="0.0"
/>