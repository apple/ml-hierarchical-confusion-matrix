/*
 * For licensing see accompanying LICENSE file.
 *
 * Copyright (C) 2022 Apple Inc. All Rights Reserved.
 */

import { parseTagString, tokenize } from '../parser';
import { Node } from '../node';

test('tokenize', () => {
    let input = 'aber';
    let tokens = ['aber'];
    expect(tokenize(input)).toStrictEqual(tokens);

    input = 'a:ber:[c,d]';
    tokens = ['a', ':', 'ber', ':', '[', 'c', ',', 'd', ']'];
    expect(tokenize(input)).toStrictEqual(tokens);

    input = '[a:b,c:d]';
    tokens = ['[', 'a', ':', 'b', ',', 'c', ':', 'd', ']'];
    expect(tokenize(input)).toStrictEqual(tokens);
});

test('parseSingleNode', () => {
    expect(parseTagString('a')).toStrictEqual([new Node('a')]);
});

test('parseSinglePath', () => {
    const input = 'a:b:c';
    const a = new Node('a', new Node('b', new Node('c')));
    expect(parseTagString(input)).toStrictEqual([a]);
});

test('parseMulti', () => {
    const input = '[a:b,c:d]';
    const result = [new Node('a', new Node('b')), new Node('c', new Node('d'))];
    expect(parseTagString(input)).toStrictEqual(result);
});

test('parseMulti same root', () => {
    const input = '[a:b,a:c]';
    const b = new Node('a', new Node('b'));
    const c = new Node('a', new Node('c'));
    expect(parseTagString(input)).toStrictEqual([b, c]);
});
