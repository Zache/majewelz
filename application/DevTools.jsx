import React from 'react';
import { branch } from 'baobab-react/higher-order'
import propTypes from 'baobab-react/prop-types'

import { seed, step } from './actions'

const DevTools = (props, context) => 
<div className="dev-tools">
	<button onClick={_ => seed(context.tree)}>Seed</button>
	<button onClick={_ => step(context.tree, props.state)}>Step</button>
</div>

DevTools.contextTypes = {
	tree: propTypes.baobab
};

export default branch(DevTools, {
	cursors: {
		state: [ 'game', '_state' ]
	}	
});