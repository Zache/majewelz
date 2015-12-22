import * as functions from './functions'

function updateState(baobab, newState, dontPurge) {
    baobab.set(['game', '_state'], 
    newState
        .map(c => dontPurge && (c.new || c.moved || c.zap || c.explode) ? { ...c, new: false, moved: false } : c)
        .sort((a,b) => a.index - b.index));
}

export function click(baobab, { index, swappable }) {
    const selectedIndexCursor = baobab.select('game', 'selectedIndex');
    const currentIndex = selectedIndexCursor.get();
    if(currentIndex === undefined) {
        selectedIndexCursor.set(index);
    }
    else if(swappable) {
        selectedIndexCursor.unset();
        baobab.set(['score','currentMove'], { removed: 0, bonus: 0})
        
        updateState(baobab, functions.swap(baobab.get('game', '_state'), currentIndex, index));
    } else {
        selectedIndexCursor.unset();
    }
}

export function seed(baobab) {
    updateState(baobab, functions.seed());
}

export function step(baobab, currentGrid) {
    if(currentGrid.some(c => c.removed)) {
        updateState(baobab, functions.fill(currentGrid), true);
    } else {
        const shouldRemove = functions.sweep(currentGrid);
        if(shouldRemove.length) 
            updateState(baobab, functions.remove(currentGrid, shouldRemove));
    }
}

export function updateScore(baobab, currentScore, currentGrid) {
    const removed = currentGrid.filter(c => c.removed).length;
    if(removed) {
        const fourBonus = Math.floor(removed / 4) * 4;
        const fiveBonus = Math.floor(removed / 5) * 5;
        
        baobab.set(['score', 'currentMove', 'removed'], currentScore.currentMove.removed + removed);
        baobab.set(['score', 'currentMove', 'bonus'], currentScore.currentMove.bonus + fourBonus + fiveBonus);
        
        baobab.set(['score', 'removed'], currentScore.removed + removed);
        baobab.set(['score', 'bonus'], currentScore.bonus + fourBonus + fiveBonus);
    }
}