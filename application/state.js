import Baobab from 'baobab';
const Monkey = Baobab.monkey;

import { columns, rows } from './functions'
import { selected } from './decorators'

module.exports = opts => new Baobab({
    debug: true,
    game: {
        state: Monkey(['.', '_state'], ['.', 'selectedIndex'], (grid, selectedIndex) => selected(grid, selectedIndex, 8)),
        _state: [],
        selectedIndex: undefined,
        columns: Monkey(['.', 'state'], grid => columns(grid)),
        rows: Monkey(['.', 'state'], grid => rows(grid))
    },
    score: {
        removed: 0,
        bonus: 0,
        currentMove: {
            removed: 0,
            bonus: 0
        },
        total: Monkey(['.', 'removed'], ['.', 'bonus'], (r, b) => r + b)
    }
}, opts || {});