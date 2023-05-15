/*
 * For licensing see accompanying LICENSE file.
 *
 * Copyright (C) 2022 Apple Inc. All Rights Reserved.
 */

import type { Condition, Spec } from './specification';
import { rollup, sum } from 'd3-array';
import cloneDeep from 'lodash';
import type { Entry } from './matrix';
import { Matrix } from './matrix';
import ndarray from 'ndarray';
import { Node } from './node';
import { parseTagString as parse } from './parser';

// TODO: Add testcases to these methods!
// TODO: Consider working on strings as long as possible to get rid of `replacer` and `revivier`.
// Ideally, we would want to have this backed by some more elaborate (database-like) system,
// that provides these operations as queries.

type Path = string;

/** Captures a single confusion. */
export interface Confusion {
    actual: Array<Path>;
    observed: Array<Path>;
    count: number;
}

function topLevel(path: Path): string {
    return path.split(':')[0];
}

export function dimensions(confusions: Array<Confusion>): Set<string> {
    const labelNames = new Set<string>();
    for (const { actual, observed } of confusions) {
        for (const l of actual) {
            labelNames.add(topLevel(l));
        }
        for (const l of observed) {
            labelNames.add(topLevel(l));
        }
    }
    return labelNames;
}

export function paths(node: Node<string>): Set<string> {
    const result: Set<string> = new Set();
    const curr: Array<string> = [];
    node.fullorder(
        (n) => curr.push(n.data),
        (n) => {
            if (n.isLeaf()) {
                result.add(curr.join(':'));
            }
            curr.pop();
        }
    );
    return result;
}

export function options(confusions: Array<Confusion>, label: string): Array<string> {
    const options: Set<string> = new Set();
    for (const { actual, observed } of confusions) {
        const foundA = actual.find((l) => topLevel(l) === label);
        if (foundA) {
            options.add(foundA);
        }
        const foundB = observed.find((l) => topLevel(l) === label);
        if (foundB) {
            options.add(foundB);
        }
    }
    return [...options];
}

function addMissingLabels(confusions: Array<Confusion>): void {
    const labels = new Set<string>();
    for (const { actual, observed } of confusions) {
        actual.forEach((p) => labels.add(topLevel(p)));
        observed.forEach((p) => labels.add(topLevel(p)));
    }
    for (const { actual, observed } of confusions) {
        for (const l of labels) {
            if (!actual.find((c) => topLevel(c) === l)) {
                actual.push(`${l}:none`);
            }
            if (!observed.find((c) => topLevel(c) === l)) {
                observed.push(`${l}:none`);
            }
        }
    }
}

function hasPathFromRoot(full: string, sub: string): boolean {
    return full.includes(`${sub}:`) || full === sub;
}

function filter(confusions: Array<Confusion>, filters: Array<string>): Array<Confusion> {
    return confusions.filter((c) => {
        return (
            filters.some((s) => c.actual.some((p) => hasPathFromRoot(p, s))) &&
            filters.some((s) => c.actual.some((p) => hasPathFromRoot(p, s)))
        );
    });
}

function condition(confusions: Array<Confusion>, cond: Condition): Array<Confusion> {
    const newConfs = confusions.filter((c) => c[cond.qualifier].some((l) => l.includes(cond.is)));
    for (const c of newConfs) {
        c[cond.qualifier] = c[cond.qualifier].filter((l) => !l.includes(cond.label));
    }
    return newConfs.filter((c) => c.actual.length !== 0 && c.observed.length !== 0);
}

function marginalize(confusions: Array<Confusion>, keep: string): Map<string, Map<string, number>> {
    const mmap: Map<string, Map<string, number>> = rollup(
        confusions,
        (v) => sum(v, (d) => d.count),
        (d: Confusion) => d.actual.find((p) => topLevel(p) === keep) ?? 'none',
        (d: Confusion) => d.observed.find((p) => topLevel(p) === keep) ?? 'none'
    );
    return mmap;
}

export function nest(paths: Array<Path>, parent: string, sub: string): void {
    const parentIndex = paths.findIndex((p) => topLevel(p) === parent);
    const subIndex = paths.findIndex((p) => topLevel(p) === sub);
    if (subIndex > -1) {
        paths[parentIndex] = paths[parentIndex].concat(`:${paths[subIndex]}`);
        paths.splice(subIndex, 1);
    }
}

export function linearize(paths: Array<Path>): Array<Path> {
    const root = new Node<string>('root');
    paths.forEach((p) => parse(p).forEach((l) => root.merge(l)));
    for (const label of root.children) {
        label.preorder((n) => {
            if (n.children.length > 1) {
                n.children = [
                    new Node(
                        `{${n
                            .leaves()
                            .map((c) => c.data)
                            .join(',')}}`
                    ),
                ];
            }
        });
    }
    return root.children.map((c) => stringify(c));
}

export function stringify(choices: Node<string>): string {
    const result = [];
    choices.preorder((n) => result.push(n.data));
    return result.join(':');
}

// TODO: Could become part of `Node` as a `pruneWith` function.
export function prune(root: Entry): void {
    root.postorder((n) => {
        if (n.children.length === 1 && n.children[0].isLeaf()) {
            n.data.name = `${n.data.name}:${n.children[0].data.name}`;
            n.children = [];
        }
    });
}

// TODO: Don't export this and write test for the complete pipeline.
export function buildHierarchy(labels: Array<string>): Entry {
    const paths = labels.map((str) => {
        const levels = str.split(':');
        const tl = new Node({ name: levels[0], id: levels[0], start: 0, end: 0 });
        let curr = tl;
        for (let i = 1; i < levels.length; ++i) {
            const tmp = new Node({
                name: levels[i],
                id: curr.data.id.concat(`:${levels[i]}`),
                start: 0,
                end: 0,
            });
            curr.children.push(tmp);
            curr = tmp;
        }
        return tl;
    });

    const root = paths.reduce(
        (acc, p) => acc.merge(p, (a, b) => a.data.id === b.data.id),
        new Node({ name: 'root', id: 'root', start: 0, end: 0 })
    );

    return addRangeIndex(root);
}

export function addRangeIndex(root: Entry): Entry {
    let leafCounter = 0;
    root.postorder((n) => {
        if (n.isLeaf()) {
            const range = { start: leafCounter, end: leafCounter + 1 };
            n.data = { ...n.data, ...range };
            leafCounter++;
        } else {
            const start = n.children[0].data.start;
            const end = n.children[n.children.length - 1].data.end;
            const range = { start, end };
            n.data = { ...n.data, ...range };
        }
    });
    return root;
}

export function buildMatrix(spec: Spec, confusions: Array<Confusion>): Matrix {
    let cloned = cloneDeep(confusions);
    addMissingLabels(cloned);

    // Condition
    if (spec.where && spec.where instanceof Array) {
        throw new Error('Multiple conditions are currently not supported.');
    } else if (spec.where && !(spec.where instanceof Array)) {
        cloned = condition(cloned, spec.where);
    }

    // Filter
    if (spec.filter && spec.filter.length > 0) {
        cloned = filter(cloned, spec.filter);
    }

    // Powerset
    for (const { actual, observed } of cloned) {
        linearize(actual);
        linearize(observed);
    }

    // Nest
    for (let i = 1; i < spec.classes.length; ++i) {
        for (const conf of cloned) {
            nest(conf.actual, spec.classes[0], spec.classes[i]);
            nest(conf.observed, spec.classes[0], spec.classes[i]);
        }
    }

    // Marginalize
    const map = marginalize(cloned, spec.classes[0]);

    const hierarchy = buildHierarchy([...map.keys()]);
    const entries = hierarchy.leaves();
    const shape = [entries.length, entries.length];
    const freqs = ndarray(new Int32Array(shape.reduce((acc, x) => acc * x, 1)), shape);

    entries.forEach((actual, i) => {
        entries.forEach((observed, j) => {
            freqs.set(i, j, map.get(actual.data.id).get(observed.data.id));
        });
    });

    prune(hierarchy.children[0]);

    return new Matrix(freqs, hierarchy.children[0]); // TODO: Get rid of unneeded nesting
}
