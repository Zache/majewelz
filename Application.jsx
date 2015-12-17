import React from 'react'
import ReactDOM from 'react-dom'
import propTypes from 'baobab-react/prop-types'
import { root } from 'baobab-react/higher-order'

import hub from './application/events' 
import baobab from './application/state'
import * as actions from './application/actions'

import Game from './application/Game.jsx'

const Application = (props, context) => 
<Game baobab={context.tree}></Game>

Application.contextTypes = {
	tree: propTypes.baobab
};

const tree = baobab({
	// immutable: false
});

tree.on('write', function(event) {
	if(event.data.path[0] == 'game' && event.data.path[1] == '_state')
		hub.emit('update');
		
	if(event.data.path[0] == 'game' && event.data.path[1] == 'selectedIndex')
		hub.emit('update');
});

hub.on('update', () => {
	window.setTimeout(() => 
	{
		actions.step(tree, tree.get('game', '_state'))
		actions.updateScore(tree, tree.get('score'), tree.get('game', '_state'))	
	}, 1000);
});

hub.on('seed', () => {
	actions.seed(tree);
});

hub.on('click', event => {
	actions.click(tree, event.data.item);
});

const RootedApplication = root(() => <Application />, tree);

ReactDOM.render(React.createElement(RootedApplication), document.getElementById('mount'));