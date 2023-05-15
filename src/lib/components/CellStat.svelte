<!--
For licensing see accompanying LICENSE file.

Copyright (C) 2022 Apple Inc. All Rights Reserved.
-->

<script lang="ts">
    export let statistic: [normalized: number, valueStr: string];
    export let cellSize = 15;
    export let columnWidth = 30;
    export let height = 3;

    $: nonNanValue = Number.isNaN(statistic[0]) ? 0 : statistic[0];
</script>

<style>
    .label {
        font-size: 10px;
        fill: #888888;
    }
</style>


<text y={cellSize / 2} dominant-baseline="middle" class="label">{statistic[1]}</text>
<g transform="translate(0,{cellSize - height})">
    <rect width={columnWidth} {height} fill="#eeeeee" />
    <rect width={nonNanValue * columnWidth} height={3} fill="#0066cc" />
</g>
