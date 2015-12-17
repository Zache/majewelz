import React from 'react';
import { branch } from 'baobab-react/higher-order'
import propTypes from 'baobab-react/prop-types'

const Debug = (props) => 
<div className="debug">
	<h5>Baobab</h5>
	<p>{JSON.stringify(props.game)}</p>
</div>

Debug.contextTypes = {
	tree: propTypes.baobab
};

export default branch(Debug, {
	cursors: {
		game: [ 'game' ]
	}	
});