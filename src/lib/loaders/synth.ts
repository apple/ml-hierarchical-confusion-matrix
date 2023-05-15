/*
 * For licensing see accompanying LICENSE file.
 *
 * Copyright (C) 2022 Apple Inc. All Rights Reserved.
 */

import type { Confusion } from '../confusions';
import { powerset } from '../setops';

function allChoices(): Array<Set<string>> {
    const vehicles = [
        'vehicle:motorized:car',
        'vehicle:motorized:motorcycle',
        'vehicle:airplane',
    ];
    const states = [
        'state:parked',
        'state:moving',
    ];
    const animals = [
        'animal:flying:bird',
        'animal:walking:cat',
    ];

    return powerset([...vehicles, ...states, ...animals]);
}

export function synth(): Array<Confusion> {
    const choices = allChoices();
    const result: Array<Confusion> = [];
    for (const actual of choices) {
        for (const observed of choices) {
            result.push({
                actual: [...actual],
                observed: [...observed],
                count: Math.floor(Math.random() * 2),
            });
        }
    }
    return result;
}
