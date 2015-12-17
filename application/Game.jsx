import React from 'react';

import DevTools from './DevTools.jsx'
import Debug from './Debug.jsx'
import Bonsai from './Bonsai.jsx'
import Score from './Score.jsx'

const Game = (props) =>
<div className="game">
	{ props.baobab.get('debug') ?
	<DevTools {...props} ></DevTools> : undefined }
	<Score />
	<Bonsai />	
	{ props.baobab.get('debug') ?
	<Debug {...props} ></Debug> : undefined }
</div>

module.exports = Game;