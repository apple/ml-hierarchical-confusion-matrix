<!--
For licensing see accompanying LICENSE file.

Copyright (C) 2022 Apple Inc. All Rights Reserved.
-->

<script lang="ts">
    import { dimensions, options } from '../confusions';
    import type {Confusion} from '../confusions';
    import { spec } from './stores';

    export let confusions: Confusion[] = null;

    // TODO: The following functions should be decoupled from this component.
    function activate(d: string) {
        $spec.classes.push(d);
        $spec = $spec;
    }

    function deactivate(d) {
        if($spec.classes.length > 1) {
            $spec.classes.splice($spec.classes.indexOf(d), 1);
            $spec = $spec;
        }
    }

    function moveLeft(i: number) {
        const [entry] = $spec.classes.splice(i, 1);
        $spec.classes.splice(i - 1, 0, entry);
        $spec = $spec;
    }

    function moveRight(i: number) {
        const [entry] = $spec.classes.splice(i, 1);
        $spec.classes.splice(i + 1, 0, entry);
        $spec = $spec;
    }

    function removeWhere(i) {
        $spec.where = undefined;
        $spec = $spec;
    }

    const dims = [...dimensions(confusions)];
    $: active = $spec.classes;
    $: inactive = dims.filter(d => !active.includes(d));
    $: where = $spec.where;

    let qualifierRef;
    let isRef;

    // TODO: Use components with Svelte's `slots` mechanism to clean this up!
</script>

<style>
    .wrapper {
        border: 1px solid #cccccc;
        border-radius: 7px;
        display: flex;
        justify-content: space-between;
        margin-top: 3px;
    }

    .chooser {
        float: left;
        border-radius: 7px;
        padding: 10px;
        margin: 5px;
    }

    .dimension {
        float: left;
        border-radius: 7px;
        padding: 10px;
        margin: 5px;
        border: 2px solid;
        cursor: pointer;
    }

    .activate {
        color: #0066cc;
    }

    .activate:hover {
        text-decoration: underline;
    }

    .active {
        color: white;
        background-color: #0066cc;
        border-color: #0066cc;
        font-size: 1.1em;
    }

    .inactive {
        color: #cccccc;
        font-size: 1.1em;
    }

    .explanation {
        float: right;
        margin: 5px;
        width: 33%;
    }

    .title {
        font-weight: 600;
        margin-right: 5px;
        font-size: 1.1em;
    }

    .desc {
        color: #888888;
    }

    .dimension .name {
        margin-right: 5px;
    }

    .warning {
        float: left;
        padding: 10px;
        margin: 5px;
        color: #888888;
    }
</style>

<h3>Dimensions</h3>
<div class="wrapper">
    <div>
        {#each active as d, i}
            <div class="dimension active">
                <span class="name" on:click={() => deactivate(d)}>{d}</span>
                <span class={i > 0 ? 'activeArrow' : 'inactiveArrow'} on:click={() => moveLeft(i)}>◁</span>
                <span class={ i < active.length - 1 ? 'activeArrow' : 'inactiveArrow'} on:click={() => moveRight(i)}>▷</span>
            </div> 
        {/each}
        {#each inactive as d}
            {#if where?.label !== d}
                <div class="dimension inactive">
                    <span on:click={() => activate(d)}>{d} <span class="activate">activate</span></span>
                </div>
            {/if}
        {/each}
    </div>
    <div class="explanation">
        <span class="title">Shelf</span>
        <span class="desc">Enable and disable different dimensions of the data. The order of dimension defines the nesting level.</span>
    </div>
</div>

<div class="wrapper">
    <div>
        {#if where}
        <div class="chooser">
            <select bind:this={qualifierRef} value={where.qualifier} on:blur={(e) => {
                $spec.where.qualifier = qualifierRef.value;
                $spec = $spec;
            }}>
            <option>actual</option>
            <option>observed</option>
        </select>
        </div>
        <div class="dimension active">
            <span class="name" >{where.label}</span>
            <span on:click={() => removeWhere(0)}>×</span>
        </div>
        <div class="chooser">
            <select bind:this={isRef} value={where.is} on:blur={(e) => {
                $spec.where.is = isRef.value;
                $spec = $spec;
            }}>
            {#each options(confusions, where.label) as opt}
            <option>{opt}</option>
            {/each}
            </select>
        </div>
        {:else} 
            {#if inactive.length > 0}
                {#each inactive as label, i}
                <div class="dimension inactive"> 
                    <span on:click={() => {
                        $spec.where = {qualifier: 'actual', label, is: options(confusions, label)[0]};
                        $spec = $spec;
                    }}>{label}</span>
                </div>
                {/each}
                {:else}
                <span class="warning">All dimensions are already in use.</span>
            {/if} 
        {/if}
    </div>
    <div class="explanation">
        <span class="title">Where</span>
        <span class="desc">Condition the confusion matrix on the value of a given label.</span>
    </div>
</div>
