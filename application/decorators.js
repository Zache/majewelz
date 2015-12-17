export function selected(grid, selectedIndex, length) {
	return [
		...grid.map(c => c.index !== selectedIndex 
		? swappableRow(selectedIndex, c.index, length) || swappableCol(selectedIndex, c.index, length) 
			? { ...c, swappable: true }
			: c 
		: { ...c, selected: true } )
	];
};

function swappableRow(aIndex, bIndex, length) {
	return Math.floor(aIndex / length) == Math.floor(bIndex / length) && (aIndex == bIndex - 1 || aIndex == bIndex + 1);
}

function swappableCol(aIndex, bIndex, length) {
	return aIndex + length == bIndex || aIndex - length == bIndex;
}