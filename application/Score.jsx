import React from 'react';
import { branch } from 'baobab-react/higher-order'
import propTypes from 'baobab-react/prop-types'

const Score = ({ score }) => 
<div id="score">
	<div>
		<span>Total score: </span>
		<span>{score.total}</span>
		<span> Move: </span>
		<span>Removed: </span>
		<span>{ score.currentMove.removed }</span>
		<span> Bonus: </span>
		<span>{ score.currentMove.bonus }</span>
	</div>
</div>

Score.contextTypes = {
	tree: propTypes.baobab
};

export default branch(Score, {
	cursors: {
		score: [ 'score' ]
	}	
});