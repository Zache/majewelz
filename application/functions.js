import { jewels } from './constants'
import { random } from './utils'

const LENGTH = 8;
const default_cellFactory = () => ({ ...jewels.types[random(0, jewels.types.length)], new: true });

function rule(rowOrColumn) {
    return rowOrColumn.reduce((agg, next, index) => {
        let slice = rowOrColumn.slice(Math.max(0, index - 1), index + 2);
        if(slice.length === 3 && slice.every(c => c.color === next.color))
            agg.push(...slice);
        return agg;
    }, []);
}

export function swap(grid, indexA, indexB) {
    return grid.map(
            c => c.index === indexA 
                ? { ...c, index: indexB } 
                : c.index === indexB 
                    ? { ...c, index: indexA } 
                    : c );
}

export function fill(grid, cellFactory = default_cellFactory, length = LENGTH) {
    const cols = columns(grid, length);
    
    return cols.reduce((agg, col) => {
        if(col.some(c => c.removed)) {
            const indexes = col.map(c => c.index).sort((a,b) => b - a);
            const keep = col.filter(c => !c.removed).sort((a,b) => b.index - a.index);
            
            agg.push(...indexes.map(index => {
                if(keep.length) 
                    return { ...keep.shift(), index };
                
                return { ...cellFactory(), index };
            }));      
        } else {
            agg.push(...col);
        }
        
        return agg;
    }, []).sort((a,b) => a.index - b.index);    
}

export function remove(grid, toRemoveArr) {
    const toRemove = toRemoveArr.reduce((agg, next) => {
		agg[next.index] = next;
		return agg;
	}, {});
	
	return grid.map(c => 
		toRemove.hasOwnProperty(c.index) 
			? { ...c, removed: true }
			: c
	);
}

export function sweep(grid) {
    return [
        ...rows(grid).map(r => rule(r)).reduce((agg, next) => {
            agg.push(...next);
            return agg;
        }, []),
        ...columns(grid).map(c => rule(c)).reduce((agg,next) => {
            agg.push(...next);
            return agg;
        }, [])
    ];
}

export function seed() {
    const grid = [];
    for(let i = 0; i < 64; i++) {
        const jewel = { ...jewels.types[random(0, jewels.types.length)] };
        jewel.index = i;
        grid.push(jewel);
    }

    return grid;
}

export function rows(grid, length = LENGTH) {
    let row = [];
    return grid.reduce(function(agg, next) {       
        if(row.push(next) == length) {
            agg.push(row);
            row = [];
        }
        
        return agg;
    }, []);
}

export function columns(grid, length = LENGTH) {
	const cols = [];
	for(let i = 0; i < length; i++)
		cols.push([])
	
    return grid.reduce(function(agg, next, index) {
        agg[index % agg.length].push(next);
        return agg;        
    }, cols);
}