/*
 * For licensing see accompanying LICENSE file.
 *
 * Copyright (C) 2022 Apple Inc. All Rights Reserved.
 */

import { nop } from './util';

// I keep on looking this up, so I'll put that here once and for all.
// Height of a node: longest number of edges to a leaf
// Depth of a node:  number of edges to root

export type PredFn<T> = (n: Node<T>) => boolean;
export type VisitFn<T> = (n: Node<T>) => void;
export type IdentityFn<T> = (a: Node<T>, b: Node<T>) => boolean;

function id<T>(a: Node<T>, b: Node<T>): boolean {
    return a.data === b.data;
}

export class Node<T> {
    children?: Array<Node<T>>;
    constructor(public data: T, ...children: Array<Node<T>>) {
        this.data = data;
        this.children = children ? children : [];
    }

    isLeaf(): boolean {
        return this.children.length === 0;
    }

    fullorder(pre: VisitFn<T>, post: VisitFn<T>, pred?: PredFn<T>): void {
        pre(this);
        if (!pred || pred(this)) {
            for (const c of this.children) {
                c.fullorder(pre, post, pred);
            }
        }
        post(this);
    }

    preorder(visit: VisitFn<T>, pred?: PredFn<T>): void {
        this.fullorder(visit, nop, pred);
    }

    postorder(visit: VisitFn<T>, pred?: PredFn<T>): void {
        this.fullorder(nop, visit, pred);
    }

    leaves(pred?: PredFn<T>): Array<Node<T>> {
        const leafs = [];
        this.preorder((n) => {
            if (n.isLeaf() || (pred && !pred(n))) {
                leafs.push(n);
            }
        }, pred);
        return leafs;
    }

    merge(other: Node<T>, identity: IdentityFn<T> = id): this {
        const match = this.children.find((own) => identity(own, other));
        if (match) {
            other.children.forEach((c) => match.merge(c, identity));
        } else {
            this.children.push(other);
        }
        return this;
    }

    has(subtree: Node<T>, identity: IdentityFn<T> = id): boolean {
        const match = this.children.find((own) => identity(own, subtree));
        if (match) {
            return subtree.children.every((c) => match.has(c, identity));
        } else {
            return false;
        }
    }

    // TODO: Consider a `Path` type here (we don't allow branches)
    find(node: Node<T>, identity: IdentityFn<T> = id): Node<T> | undefined {
        if (node.isLeaf()) {
            return this.children.find((own) => identity(own, node));
        } else {
            const match = this.children.find((own) => identity(own, node));
            if (match) {
                return match.find(node.children[0], identity);
            }
        }
    }

    // TODO: Consider a `Path` type here (we don't allow branches)
    remove(node: Node<T>, identity: IdentityFn<T> = id): Node<T> | undefined {
        if (node.isLeaf()) {
            const index = this.children.findIndex((own) => identity(own, node));
            if (index > -1) {
                return this.children.splice(index, 1)[0];
            }
        } else {
            const match = this.children.find((own) => identity(own, node));
            if (match) {
                return match.remove(node, identity);
            }
        }
    }
}
