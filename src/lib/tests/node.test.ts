/*
 * For licensing see accompanying LICENSE file.
 *
 * Copyright (C) 2022 Apple Inc. All Rights Reserved.
 */

import { expect, test } from 'vitest'
import { Node } from '../node';

export function simpleTree(): Node<string> {
    const a = new Node('a');
    const b = new Node('b');
    const c = new Node('c');
    const d = new Node('d');
    const e = new Node('e');
    const f = new Node('f');
    const g = new Node('g');
    const h = new Node('h');
    b.children = [e, f];
    d.children = [g, h];
    a.children = [b, c, d];
    return a;
}

export function walk(node: Node<string>): string {
    let result = '';
    node.fullorder(
        (n) => (result += n.data),
        (n) => (result += n.data)
    );
    return result;
}

test('fullorder', () => {
    const order = 'abeeffbccdgghhda';
    expect(walk(simpleTree())).toBe(order);
});

test('fullorderIf', () => {
    const order = 'abeeffbccdda';
    let walk = '';
    const collapsed = new Set('d');
    simpleTree().fullorder(
        (n) => (walk += n.data),
        (n) => (walk += n.data),
        (n) => !collapsed.has(n.data)
    );
    expect(walk).toBe(order);
});

test('leaves', () => {
    let walk = '';
    simpleTree()
        .leaves()
        .map((n) => (walk += n.data));
    expect(walk).toBe('efcgh');

    const root = new Node('a');
    walk = '';
    root.leaves().map((n) => (walk += n.data));
    expect(walk).toBe('a');
});

test('leavesIf', () => {
    const order = 'efcd';
    let walk = '';
    const collapsed = new Set('d');
    simpleTree()
        .leaves((n) => !collapsed.has(n.data))
        .map((n) => (walk += n.data));
    expect(walk).toBe(order);
});

test('merge one level', () => {
    const a = new Node('a', new Node('b'));
    const c = new Node('c', new Node('d'));
    a.merge(c);
    expect(walk(a)).toBe('abbcddca');
});

test('hasPath', () => {
    const a = new Node('a', new Node('b'), new Node('c', new Node('d')));

    expect(a.has(new Node('b'))).toBe(true);
    expect(a.has(new Node('d'))).toBe(false);
    expect(a.has(new Node('c', new Node('d')))).toBe(true);
    expect(a.has(new Node('c', new Node('d'), new Node('e')))).toBe(false);
    expect(a.has(new Node('c', new Node('d', new Node('e'))))).toBe(false);
});

test('remove', () => {
    const a = new Node('a', new Node('b'), new Node('c', new Node('d')));

    const removed = a.remove(new Node('c'));
    expect(removed).toStrictEqual(new Node('c', new Node('d')));
    expect(a).toStrictEqual(new Node('a', new Node('b')));

    const undef = a.remove(new Node('x'));
    expect(undef).toBe(undefined);
    expect(a).toStrictEqual(new Node('a', new Node('b')));
});

test('find', () => {
    const a = new Node('a', new Node('b'), new Node('c', new Node('d')));

    const match = a.find(new Node('c'));
    expect(match).toStrictEqual(new Node('c', new Node('d')));

    const undef = a.find(new Node('x'));
    expect(undef).toBe(undefined);
});
