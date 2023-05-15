/*
 * For licensing see accompanying LICENSE file.
 *
 * Copyright (C) 2022 Apple Inc. All Rights Reserved.
 */

import type { Node, PredFn } from './node';

export interface LayoutedNode<T> {
    node: Node<T>;
    pos: [number, number];
    span: number;
}

export function layoutCompact<T>(pred: PredFn<T>, hierarchy: Node<T>): Array<LayoutedNode<T>> {
    const currPos = [0, 0];
    const numChilds = new Map();
    const layout = [];
    const isBottom = (node: Node<T>): boolean => node.isLeaf() || !pred(node);
    hierarchy.fullorder(
        n => { // pre-order
            layout.push({ node: n, pos: [currPos[0], currPos[1]] });
            currPos[0] += 1;

            if (isBottom(n)) {
                numChilds.set(n, 1);
            }
        },
        n => { // post-order
            if (!isBottom(n)) {
                const nc = n.children.reduce((acc, c) => acc + numChilds.get(c), 0);
                numChilds.set(n, nc);
            }
            currPos[0] -= 1;

            if (isBottom(n)) {
                currPos[1] += 1;
            }
        },
        pred,
    );
    layout.forEach(l => {
        l.span = numChilds.get(l.node);
        return l;
    });
    return layout;
}

export function layoutClassic<T>(pred: PredFn<T>, hierarchy: Node<T>): Array<LayoutedNode<T>> {
    const currPos = [0, 0];
    const numDescend = new Map();
    const layout = [];
    const isBottom = (node: Node<T>): boolean => node.isLeaf() || !pred(node);
    hierarchy.fullorder(
        n => { // pre-order
            layout.push({ node: n, pos: [currPos[0], currPos[1]] });
            currPos[0] += 1;
            currPos[1] += 1;

            if (isBottom(n)) {
                numDescend.set(n, 0);
            }
        },
        n => { // post-order
            if (!isBottom(n)) {
                const nc = n.children.length
                    + n.children.reduce((acc, c) => acc + numDescend.get(c), 0);
                numDescend.set(n, nc);
            }
            currPos[0] -= 1;
        },
        pred,
    );
    layout.forEach(l => {
        l.span = numDescend.get(l.node);
        return l;
    });
    return layout;
}

export function flip<T>(layout: Array<LayoutedNode<T>>): Array<LayoutedNode<T>> {
    return layout.map(({ node, pos, span }) => ({ node, pos: [pos[1], pos[0]], span }));
}
