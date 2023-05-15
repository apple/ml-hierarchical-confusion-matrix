<!--
For licensing see accompanying LICENSE file.

Copyright (C) 2022 Apple Inc. All Rights Reserved.
-->

<script>
    import { spec } from './stores';

    export let encoding;
    export let normalization;

    const encodingChoices = new Map([
        ['Size', 'size'],
        ['Color', 'color'],
    ]);

    const mappingChoices = new Map([
        ['Counts', 'total'],
        ['Row probabilities', 'row'],
        ['Column probabilities', 'column'],
    ]);

    $: encodingRef = encoding;
    $: mappingRef = normalization;
</script>

<style>
    .wrapper {
        display: flex;
    }

    .options {
        border: 1px solid #cccccc;
        padding: 7px;
        margin-right: 7px;
        border-radius: 5px;
    }

    .name {
        font-weight: 600;
        font-size: 1.1em;
        margin-right: 5px;
    }

    .opt {
        margin-right: 7px;
    }
</style>

<div class="wrapper">
    <div class="options">
        <span class="name">Encoding</span>
        {#each [...encodingChoices.entries()] as [name, enc]}
        <label class="opt">
            <input type=radio on:change={e => { $spec.encoding = e.currentTarget.value; $spec = $spec; }} bind:group={encodingRef} value={enc}> {name}
        </label>
        {/each}
    </div>
    <div class="options">
        <span class="name">Normalization</span>
        {#each [...mappingChoices.entries()] as [name, mapping]}
        <label class="opt">
            <input type=radio on:change={e => { $spec.normalization = e.currentTarget.value; $spec = $spec; }} bind:group={mappingRef} value={mapping}> {name}
        </label>
        {/each}
    </div>
</div>
