/*
 * For licensing see accompanying LICENSE file.
 *
 * Copyright (C) 2022 Apple Inc. All Rights Reserved.
 */

/**
 * Labels may use the following grammar:
 *
 * <path> ::= <label> | <multi> | <label> ":" <path>
 * <label> ::= ([1-9] | [a-z])+
 * <multi> ::= "[" <path> "," <list> "]"
 * <list> ::= <path> | <path> "," <list>
 */

import { Node } from './node';

export function mergeMultiple(parent: Node<string>, others: Array<Node<string>>): void {
    others.reduce((acc, n) => acc.merge(n), parent);
}

export function parseTagString(str: string): Array<Node<string>> {
    const tokens = tokenize(str);
    const delimiter = new Set([',', ':', '[', ']']);

    let i = 0;

    function eat(char): void {
        if (tokens[i] !== char) {
            throw new Error(`Expected "${char}, got ${tokens[i]}".`);
        }
        i++;
    }

    function parseCategoryColon(): Array<Node<string>> {
        if (tokens[i + 1] === ':') {
            const n = new Node(parseText());
            eat(':');
            mergeMultiple(n, parsePath());
            return [n];
        }
    }

    function parsePath(): Array<Node<string>> {
        return parseCategoryColon()
            ?? parseMulti()
            ?? parseEntity();
    }

    function parseText(): string {
        if (tokens[i] && !delimiter.has(tokens[i])) {
            const value = tokens[i];
            i++;
            return value;
        }
    }

    function parseEntity(): Array<Node<string>> {
        const text = parseText();
        if (text) {
            return [new Node(text)];
        }
    }

    function parseMulti(): Array<Node<string>> {
        if (tokens[i] === '[') {
            eat('[');
            const nodes = parsePath();
            eat(',');
            nodes.push(...parseList());
            eat(']');
            return nodes;
        }
    }

    function parseListComma(): Array<Node<string>> {
        if (tokens[i + 1] === ',') {
            const nodes = parsePath();
            eat(',');
            nodes.push(...parseList());
            return nodes;
        }
    }

    function parseList(): Array<Node<string>> {
        return parseListComma()
            ?? parsePath();
    }

    return parsePath();
}

// TODO: Write proper tokenizer with classes/enums.
export function tokenize(str: string): Array<string> {
    let i = 0;
    const tokens = [];

    let curr = '';
    while (i < str.length) {
        switch (str.charAt(i)) {
            case ':':
                if (curr !== '') { tokens.push(curr); curr = ''; }
                tokens.push(str.charAt(i));
                break;
            case ',':
                if (curr !== '') { tokens.push(curr); curr = ''; }
                tokens.push(str.charAt(i));
                break;
            case '[':
                if (curr !== '') { tokens.push(curr); curr = ''; }
                tokens.push(str.charAt(i));
                break;
            case ']':
                if (curr !== '') { tokens.push(curr); curr = ''; }
                tokens.push(str.charAt(i));
                break;
            default: curr += str.charAt(i);
        }
        i++;
    }
    if (curr !== '') {
        tokens.push(curr);
    }
    return tokens;
}
