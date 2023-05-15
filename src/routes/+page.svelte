<!--
For licensing see accompanying LICENSE file.

Copyright (C) 2022 Apple Inc. All Rights Reserved.
-->

<script lang="ts">
    import { cloneDeep } from 'lodash';
    import MatrixWithUI from '../lib/components/MatrixWithUI.svelte';
    import { spec } from '../lib/components/stores';
    import { version } from '$app/environment';

    /** @type {import('./$types').PageData} */
    export let data;
    const examples = data.examples;
    let example = examples[0];

    let specVisible = false;

    // We always want to start with a fresh slate
    $: $spec = cloneDeep(example.spec);

    $: confusionPromise = example.loader(example.filename);

    let textarea: HTMLTextAreaElement;
</script>

<style>
    .fixed-header {
        top: 0;
        height: 50px;
        width: 100%;
        position: fixed;
        background: #333;
        color: #fff;
        z-index: 2;
    }

    .fixed-header nav {
        display: flex;
        height: 100%;
        align-items: center;
    }

    .fixed-header nav .nav-brand {
        font-size: 1.4em;
        font-weight: 600;
    }

    .fixed-header .container {
        height: 100%;
    }

    .fixed-header + .container {
        padding-top: 80px;
        padding-bottom: 100px;
    }

    .container {
        width: 80%;
        margin: 0 auto; /* Center the DIV horizontally */
    }

    ul {
        padding: 0;
        margin: 0;
        list-style: none;
        display: block;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        padding-inline-start: 40px;
    }

    li {
        display: inline-block;
        color: #fff;
        text-decoration: none;
        font-size: 1.1em;
    }

    textarea {
        border: 1px solid #cccccc;
        border-radius: 7px;
        padding: 10px;
        font-family: SF Mono, Menlo, Monaco, Mono;
    }

    a {
        color: #fff;
        text-decoration: none;
        padding: 7px 25px;
    }

    textarea {
        float: left;
        width: 66%;
    }

    .specBox {
        display: flex;
        width: 100%;
        margin-bottom: 30px;
        justify-content: space-between;
    }

    .specDesc {
        float: right;
        width: 33%;
        margin: 5px;
    }

    .specDesc .title {
        font-size: 1.1em;
        font-weight: 600;
        margin-right: 5px;
    }

    .specDesc .desc {
        color: #888888;
    }

    .version {
        color: #aaa;
        margin-left: 1em;
        font-weight: normal;
        font-size: 0.8em;
    }
</style>

<div class="fixed-header">
    <div class="container">
        <nav>
            <div class="nav-brand">Neo: Hierarchical Confusion Matrix<small class="version">Version { version }</small></div>
            <ul>
                <li>
                    Dataset:
                    <select bind:value={example}>
                        {#each examples as ex}
                            <option value={ex}>{ex.description}</option>
                        {/each}
                    </select>
                </li>
                <li>
                    {#if specVisible}
                        <!-- svelte-ignore a11y-invalid-attribute -->
                        <a href="#" on:click={() => specVisible = !specVisible}>Specification</a>
                    {:else}
                        <!-- svelte-ignore a11y-invalid-attribute -->
                        <a href="#" on:click={() => specVisible = !specVisible}>Specification</a>
                    {/if}
                </li>
            </ul>
        </nav>
    </div>
</div>

<div class="container">
    {#if specVisible}
    <div class="specBox">
        <textarea rows="20" bind:this={textarea}>{JSON.stringify($spec, undefined, 4)}</textarea>
        <div class="specDesc">
            <span class="title">Specification</span><span class="desc">All the configuration and state of the confusion matrix is stored in an easily shareable JSON format. Changing values in the textarea updates the visualization.</span>
            <button on:click={() => {
                $spec = JSON.parse(textarea.value);
            }}>Update</button>
        </div>
    </div>
    {/if}

    {#await confusionPromise}
    	<p>...waiting</p>
    {:then confusions}
        <MatrixWithUI {confusions} />
    {:catch error}
	    <p style="color: red">{error.message}</p>
    {/await}
</div>
