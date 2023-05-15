<!--
For licensing see accompanying LICENSE file.

Copyright (C) 2022 Apple Inc. All Rights Reserved.
-->

<script>
    import Matrix from './Matrix.svelte';
    import UIOptions from './UIOptions.svelte';
    import UIShelf from './UIShelf.svelte';
    import { spec } from './stores';

    export let confusions = null;
</script>

<UIOptions encoding={$spec.encoding} normalization={$spec.normalization} />
<UIShelf {confusions} />
<Matrix {confusions} />