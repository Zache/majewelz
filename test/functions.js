var test = require('tape');

require('babel-register');

var functions = require('../application/functions');

test('sweep should get one row and one column', function(assert) {
	assert.plan(1);
	
	var grid = [
		{ color: "yellow", index: 0 }, { color: "yellow", index: 1 }, { color: "purple", index: 2 }, { color: "green", index: 3 }, { color: "white", index: 4 }, { color: "green", index: 5 }, { color: "blue", index: 6 }, { color: "purple", index: 7 }, 
		{ color: "yellow", index: 8 }, { color: "white", index: 9 }, { color: "purple", index: 10 }, { color: "green", index: 11 }, { color: "blue", index: 12 }, { color: "red", index: 13 }, { color: "orange", index: 14 }, { color: "purple", index: 15 }, 
		{ color: "blue", index: 16 }, { color: "orange", index: 17 }, { color: "purple", index: 18 }, { color: "orange", index: 19 }, 
		{ color: "yellow", index: 20 }, { color: "yellow", index: 21 }, { color: "yellow", index: 22 },
		{ color: "green", index: 23 }, 
		{ color: "purple", index: 24 }, { color: "purple", index: 25 }, { color: "orange", index: 26 }, { color: "green", index: 27 },
		{ color: "green", index: 28 },{ color: "purple", index: 29 },{ color: "green", index: 30 },{ color: "white", index: 31 },{ color: "yellow", index: 32 },{ color: "green", index: 33 },{ color: "green", index: 34 },
		{ color: "red", index: 35 }, { color: "white", index: 36 },{ color: "purple", index: 37 },{ color: "red", index: 38 },{ color: "purple", index: 39 },{ color: "white", index: 40 },{ color: "purple", index: 41 },
		{ color: "purple", index: 42 },{ color: "red", index: 43 },{ color: "white", index: 44 },{ color: "green", index: 45 },{ color: "purple", index: 46 },{ color: "blue", index: 47 },{ color: "blue", index: 48 }, { color: "white", index: 49 },
		{ color: "red", index: 50 }, { color: "blue", index: 51 }, { color: "orange", index: 52 }, { color: "orange", index: 53 }, { color: "yellow", index: 54 }, { color: "white", index: 55 }, { color: "yellow", index: 56 }, 
		{ color: "blue", index: 57 }, { color: "white", index: 58 }, { color: "yellow", index: 59 }, { color: "green", index: 60 }, { color: "red", index: 61 }, { color: "orange", index: 62 }, { color: "yellow", index: 63 }
	];
	
	// y y|p|g w g b p
	// y w|p|g b r o p
	// b o|p|o[Y|Y|Y]g
	// p p o g g p g w
	// y g g r w p r p
	// w p p r w g p b
	// b w r b o o y w
	
	var result = functions.sweep(grid, 'test2');
	
	var expected = [
		{ color: "yellow", index: 20 },
		{ color: "yellow", index: 21 },
		{ color: "yellow", index: 22 },
		{ color: "purple", index: 2 },
		{ color: "purple", index: 10 },
		{ color: "purple", index: 18 }
	];
	
	assert.deepEqual(result, expected);
});

test('mark should mark one row and one column', function(assert) {
	assert.plan(1);
	var grid = [
		{ color: "yellow", index: 0 }, { color: "yellow", index: 1 }, { color: "purple", index: 2 }, { color: "green", index: 3 }, { color: "white", index: 4 }, { color: "green", index: 5 }, { color: "blue", index: 6 }, { color: "purple", index: 7 }, 
		{ color: "yellow", index: 8 }, { color: "white", index: 9 }, { color: "purple", index: 10 }, { color: "green", index: 11 }, { color: "blue", index: 12 }, { color: "red", index: 13 }, { color: "orange", index: 14 }, { color: "purple", index: 15 }, 
		{ color: "blue", index: 16 }, { color: "orange", index: 17 }, { color: "purple", index: 18 }, { color: "orange", index: 19 }, 
		{ color: "yellow", index: 20 }, { color: "yellow", index: 21 }, { color: "yellow", index: 22 },
		{ color: "green", index: 23 }, 
		{ color: "purple", index: 24 }, { color: "purple", index: 25 }, { color: "orange", index: 26 }, { color: "green", index: 27 },
		{ color: "green", index: 28 },{ color: "purple", index: 29 },{ color: "green", index: 30 },{ color: "white", index: 31 },{ color: "yellow", index: 32 },{ color: "green", index: 33 },{ color: "green", index: 34 },
		{ color: "red", index: 35 }, { color: "white", index: 36 },{ color: "purple", index: 37 },{ color: "red", index: 38 },{ color: "purple", index: 39 },{ color: "white", index: 40 },{ color: "purple", index: 41 },
		{ color: "purple", index: 42 },{ color: "red", index: 43 },{ color: "white", index: 44 },{ color: "green", index: 45 },{ color: "purple", index: 46 },{ color: "blue", index: 47 },{ color: "blue", index: 48 }, { color: "white", index: 49 },
		{ color: "red", index: 50 }, { color: "blue", index: 51 }, { color: "orange", index: 52 }, { color: "orange", index: 53 }, { color: "yellow", index: 54 }, { color: "white", index: 55 }, { color: "yellow", index: 56 }, 
		{ color: "blue", index: 57 }, { color: "white", index: 58 }, { color: "yellow", index: 59 }, { color: "green", index: 60 }, { color: "red", index: 61 }, { color: "orange", index: 62 }, { color: "yellow", index: 63 }
	];
		
	var result = functions.remove(grid, [
		{ color: "yellow", index: 20 },
		{ color: "yellow", index: 21 },
		{ color: "yellow", index: 22 },
		{ color: "purple", index: 2 },
		{ color: "purple", index: 10 },
		{ color: "purple", index: 18 }
	]);
	
	var expected = [
		{ color: "yellow", index: 0 }, { color: "yellow", index: 1 }, { removed: true, index: 2 }, { color: "green", index: 3 }, { color: "white", index: 4 }, { color: "green", index: 5 }, { color: "blue", index: 6 }, { color: "purple", index: 7 }, 
		{ color: "yellow", index: 8 }, { color: "white", index: 9 }, { removed: true, index: 10 }, { color: "green", index: 11 }, { color: "blue", index: 12 }, { color: "red", index: 13 }, { color: "orange", index: 14 }, { color: "purple", index: 15 }, 
		{ color: "blue", index: 16 }, { color: "orange", index: 17 }, { removed: true, index: 18 }, { color: "orange", index: 19 }, 
		{ removed: true, index: 20 }, { removed: true, index: 21 }, { removed: true, index: 22 },
		{ color: "green", index: 23 }, 
		{ color: "purple", index: 24 }, { color: "purple", index: 25 }, { color: "orange", index: 26 }, { color: "green", index: 27 },
		{ color: "green", index: 28 },{ color: "purple", index: 29 },{ color: "green", index: 30 },{ color: "white", index: 31 },{ color: "yellow", index: 32 },{ color: "green", index: 33 },{ color: "green", index: 34 },
		{ color: "red", index: 35 }, { color: "white", index: 36 },{ color: "purple", index: 37 },{ color: "red", index: 38 },{ color: "purple", index: 39 },{ color: "white", index: 40 },{ color: "purple", index: 41 },
		{ color: "purple", index: 42 },{ color: "red", index: 43 },{ color: "white", index: 44 },{ color: "green", index: 45 },{ color: "purple", index: 46 },{ color: "blue", index: 47 },{ color: "blue", index: 48 }, { color: "white", index: 49 },
		{ color: "red", index: 50 }, { color: "blue", index: 51 }, { color: "orange", index: 52 }, { color: "orange", index: 53 }, { color: "yellow", index: 54 }, { color: "white", index: 55 }, { color: "yellow", index: 56 }, 
		{ color: "blue", index: 57 }, { color: "white", index: 58 }, { color: "yellow", index: 59 }, { color: "green", index: 60 }, { color: "red", index: 61 }, { color: "orange", index: 62 }, { color: "yellow", index: 63 }
	];
	
	assert.deepEqual(result, expected);
});

test('fill 3x3, column', function(assert) {
	assert.plan(1);
	var grid = [
		{ color : 'red', index: 0 }, { removed: true, index: 1 }, { color : 'red', index: 2 },
		{ color : 'green', index: 3 }, { removed: true, index: 4 }, { color : 'green', index: 5 },
		{ color : 'blue', index: 6 }, { removed: true, index: 7 }, { color : 'blue', index: 8 }
	];
	
	var cellSupply = [
		{ color: 'black' },
		{ color: 'black' },
		{ color: 'black' }
	];
	
	var result = functions.fill(grid, function() {
		return cellSupply.pop();
	}, 3);
	
	var expected = [
		{ color : 'red', index: 0 }, { color: 'black', index: 1 }, { color : 'red', index: 2 },
		{ color : 'green', index: 3 }, { color: 'black', index: 4 }, { color : 'green', index: 5 },
		{ color : 'blue', index: 6 }, { color: 'black', index: 7 }, { color : 'blue', index: 8 }
	];
	
	assert.deepEqual(result, expected);
});

test('fill 3x3, row 2', function(assert) {
	assert.plan(1);
	
	var grid = [
		{ color : '0', index: 0 },  { color : '1', index: 1 }, { color : '2', index: 2 },
		{ removed: true, index: 3 }, { removed: true, index: 4 }, { removed: true, index: 5 },
		{ color : '6', index: 6 }, { color : '7', index: 7 }, { color : '8', index: 8 }
	];
	
	var cellSupply = [
		{ color: 'black' },
		{ color: 'black' },
		{ color: 'black' }
	];
	
	var result = functions.fill(grid, function() {
		return cellSupply.pop();
	}, 3);
	
	var expected = [
		{ color: 'black', index: 0 }, { color: 'black', index: 1 }, { color: 'black', index: 2 },
		{ color : '0', index: 3 },  { color : '1', index: 4 }, { color : '2', index: 5 },
		{ color : '6', index: 6 }, { color : '7', index: 7 }, { color : '8', index: 8 }
	];
	
	assert.deepEqual(result, expected);
});

test('fill 3x3, row 1', function(assert) {
	assert.plan(1);
	var grid = [
		{ removed: true, index: 0 }, { removed: true, index: 1 }, { removed: true, index: 2 },
		{ color : '3', index: 3 },  { color : '4', index: 4 }, { color : '5', index: 5 },
		{ color : '6', index: 6 }, { color : '7', index: 7 }, { color : '8', index: 8 }
	];
	
	var cellSupply = [
		{ color: 'black' },
		{ color: 'black' },
		{ color: 'black' }
	];
	
	var result = functions.fill(grid, function() {
		return cellSupply.pop();
	}, 3);
	
	var expected = [
		{ color: 'black', index: 0 }, { color: 'black', index: 1 }, { color: 'black', index: 2 },
		{ color : '3', index: 3 },  { color : '4', index: 4 }, { color : '5', index: 5 },
		{ color : '6', index: 6 }, { color : '7', index: 7 }, { color : '8', index: 8 }
	];
	
	assert.deepEqual(result, expected);
});

test('fill 3x3, 1 col, 1 row', function(assert) {
	assert.plan(1);
	
	var grid = [
		{ color : 'red', index: 0 },  { removed: true, index: 1 }, { color : 'green', index: 2 },
		{ removed: true, index: 3 }, { removed: true, index: 4 }, { removed: true, index: 5 },
		{ color : 'green', index: 6 }, { removed: true, index: 7 }, { color : 'blue', index: 8 }
	];
	
	var cellSupply = [
		{ color: 'black' },
		{ color: 'black' },
		{ color: 'black' },
		{ color: 'black' },
		{ color: 'black' }
	];
	
	var result = functions.fill(grid, function() {
		return cellSupply.pop();
	}, 3);
	
	var expected = [
		{ color: 'black', index: 0 }, { color: 'black', index: 1 }, { color: 'black', index: 2 },
		{ color : 'red', index: 3 },  { color : 'black', index: 4 }, { color : 'green', index: 5 },
		{ color : 'green', index: 6 }, { color : 'black', index: 7 }, { color : 'blue', index: 8 }
	];
	
	assert.deepEqual(result, expected);
});

test('fill 8x8, 1 col, 1 row', function(assert) {
	assert.plan(1);
	
	var grid = [
		{ color: "yellow", index: 0 }, { color: "yellow", index: 1 }, { removed: true, index: 2 }, { color: "green", index: 3 }, { color: "white", index: 4 }, { color: "green", index: 5 }, { color: "blue", index: 6 }, { color: "purple", index: 7 }, 
		{ color: "yellow", index: 8 }, { color: "white", index: 9 }, { removed: true, index: 10 }, { color: "green", index: 11 }, { color: "blue", index: 12 }, { color: "red", index: 13 }, { color: "orange", index: 14 }, { color: "purple", index: 15 }, 
		{ color: "blue", index: 16 }, { color: "orange", index: 17 }, { removed: true, index: 18 }, { color: "orange", index: 19 }, { removed: true, index: 20 }, { removed: true, index: 21 }, { removed: true, index: 22 }, { color: "green", index: 23 }, 
		{ color: "purple", index: 24 }, { color: "purple", index: 25 }, { color: "orange", index: 26 }, { color: "green", index: 27 }, { color: "green", index: 28 },{ color: "purple", index: 29 },{ color: "green", index: 30 },{ color: "white", index: 31 },
		{ color: "yellow", index: 32 },{ color: "green", index: 33 },{ color: "green", index: 34 },	{ color: "red", index: 35 }, { color: "white", index: 36 },{ color: "purple", index: 37 },{ color: "red", index: 38 },{ color: "purple", index: 39 },
		{ color: "white", index: 40 },{ color: "purple", index: 41 }, { color: "purple", index: 42 },{ color: "red", index: 43 },{ color: "white", index: 44 },{ color: "green", index: 45 },{ color: "purple", index: 46 },{ color: "blue", index: 47 },
		{ color: "blue", index: 48 }, { color: "white", index: 49 }, { color: "red", index: 50 }, { color: "blue", index: 51 }, { color: "orange", index: 52 }, { color: "orange", index: 53 }, { color: "yellow", index: 54 }, { color: "white", index: 55 }, 
		{ color: "yellow", index: 56 }, { color: "blue", index: 57 }, { color: "white", index: 58 }, { color: "yellow", index: 59 }, { color: "green", index: 60 }, { color: "red", index: 61 }, { color: "orange", index: 62 }, { color: "yellow", index: 63 }
	];

	// y y|p|g w g b p
	// y w|p|g b r o p
	// b o|p|o[Y|Y|Y]g
	// p p o g g p g w
	// y g g r w p r p
	// w p p r w g p b
	// b w r b o o y w

	var cellSupply = [
		{ color: "black" },
		{ color: "black" },
		{ color: "black" },
		{ color: "black" },
		{ color: "black" },
		{ color: "black" }		
	];
	
	var result = functions.fill(grid, function() {
		return cellSupply.pop();
	});
	
	// y y B g B B B p
	// y w B g w g b p
	// b o B o b r o g
	// p p o g g p g w
	// y g g r w p r p
	// w p p r w g p b
	// b w r b o o y w

	var expected  = [
		{ color: "yellow", index: 0 }, { color: "yellow", index: 1 }, { color: "black", index: 2 }, { color: "green", index: 3 }, { color: "black", index: 4 }, { color: "black", index: 5 }, { color: "black", index: 6 }, { color: "purple", index: 7 }, 
		{ color: "yellow", index: 8 }, { color: "white", index: 9 }, { color: "black", index: 10 }, { color: "green", index: 11 }, { color: "white", index: 12 }, { color: "green", index: 13 }, { color: "blue", index: 14 }, { color: "purple", index: 15 }, 
		{ color: "blue", index: 16 }, { color: "orange", index: 17 }, { color: "black", index: 18 }, { color: "orange", index: 19 }, { color: "blue", index: 20 }, { color: "red", index: 21 }, { color: "orange", index: 22 }, { color: "green", index: 23 }, 
		{ color: "purple", index: 24 }, { color: "purple", index: 25 }, { color: "orange", index: 26 }, { color: "green", index: 27 }, { color: "green", index: 28 },{ color: "purple", index: 29 },{ color: "green", index: 30 },{ color: "white", index: 31 },
		{ color: "yellow", index: 32 },{ color: "green", index: 33 },{ color: "green", index: 34 }, { color: "red", index: 35 }, { color: "white", index: 36 },{ color: "purple", index: 37 },{ color: "red", index: 38 },{ color: "purple", index: 39 },
		{ color: "white", index: 40 },{ color: "purple", index: 41 }, { color: "purple", index: 42 },{ color: "red", index: 43 },{ color: "white", index: 44 },{ color: "green", index: 45 },{ color: "purple", index: 46 },{ color: "blue", index: 47 },
		{ color: "blue", index: 48 }, { color: "white", index: 49 }, { color: "red", index: 50 }, { color: "blue", index: 51 }, { color: "orange", index: 52 }, { color: "orange", index: 53 }, { color: "yellow", index: 54 }, { color: "white", index: 55 }, 
		{ color: "yellow", index: 56 }, { color: "blue", index: 57 }, { color: "white", index: 58 }, { color: "yellow", index: 59 }, { color: "green", index: 60 }, { color: "red", index: 61 }, { color: "orange", index: 62 }, { color: "yellow", index: 63 }
	];
	
	assert.deepEqual(result, expected);
});

test('swap swaps', function(assert) { 
	assert.plan(2);
	var grid = [ { index: 0, data: 'foo' }, { index: 1, data: 'bar' } ];
	var result = functions.swap(grid, 0, 1);
	var expected = [ { index: 1, data: 'foo' }, { index: 0, data: 'bar' } ];
	assert.deepEqual(result, expected);
	result = functions.swap(grid, 1, 0);
	assert.deepEqual(result, expected);
});