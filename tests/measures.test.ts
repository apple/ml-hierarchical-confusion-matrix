/*
 * For licensing see accompanying LICENSE file.
 *
 * Copyright (C) 2022 Apple Inc. All Rights Reserved.
 */

import { accuracy, precision, recall } from '../src/matrix';
import { synthMatrix } from './matrix.test';

// TODO: Add test cases for aggregated nodes

test('truePositives', () => {
    const matrix = synthMatrix();
    const [a, b, c] = matrix.axis.leaves();
    expect(matrix.truePositives(a)).toBe(3);
    expect(matrix.truePositives(b)).toBe(4);
    expect(matrix.truePositives(c)).toBe(7);
});

test('falsePositives', () => {
    const matrix = synthMatrix();
    const [a, b, c] = matrix.axis.leaves();
    expect(matrix.falsePositives(a)).toBe(4);
    expect(matrix.falsePositives(b)).toBe(7);
    expect(matrix.falsePositives(c)).toBe(5);
});

test('trueNegatives', () => {
    const matrix = synthMatrix();
    const [a, b, c] = matrix.axis.leaves();
    expect(matrix.trueNegatives(a)).toBe(11);
    expect(matrix.trueNegatives(b)).toBe(10);
    expect(matrix.trueNegatives(c)).toBe(7);
});

test('falseNegatives', () => {
    const matrix = synthMatrix();
    const [a, b, c] = matrix.axis.leaves();
    expect(matrix.falseNegatives(a)).toBe(7);
    expect(matrix.falseNegatives(b)).toBe(6);
    expect(matrix.falseNegatives(c)).toBe(3);
});

test('precision', () => {
    const matrix = synthMatrix();
    const [a, b, c] = matrix.axis.leaves();
    expect(precision(matrix, a)).toBe(3 / 7);
    expect(precision(matrix, b)).toBe(4 / 11);
    expect(precision(matrix, c)).toBe(7 / 12);
});

test('recall', () => {
    const matrix = synthMatrix();
    const [a, b, c] = matrix.axis.leaves();
    expect(recall(matrix, a)).toBe(3 / 10);
    expect(recall(matrix, b)).toBe(4 / 10);
    expect(recall(matrix, c)).toBe(7 / 10);
});

test('accuracy', () => {
    const matrix = synthMatrix();
    const [a, b, c] = matrix.axis.leaves();
    expect(accuracy(matrix, a)).toBe((3 + 11) / (3 + 11 + 7 + 4));
    expect(accuracy(matrix, b)).toBe((4 + 10) / (4 + 10 + 6 + 7));
    expect(accuracy(matrix, c)).toBe((7 + 7) / (7 + 7 + 3 + 5));
});
