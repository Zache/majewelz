import React from 'react'
import { branch } from 'baobab-react/higher-order'
import propTypes from 'baobab-react/prop-types'

import hub from './events'

const BONSAINODEID = 'bonsai';

class Bonsai extends React.Component {
	constructor(props, context) {
		super(props, context);
	}
	shouldComponentUpdate() {
		return false;
	}
	componentDidMount() {
		const board = bonsai.run(
			document.getElementById(BONSAINODEID),
			{
				code: function() {
					const unit = 64;
					const border = 4;
					let container;
										
					stage.on('message:columns', refresh);
					
					function rectFactory(x, y, cell) {
						if(cell.selected) 
							return new Rect((x * unit) + border / 2, (y * unit) + border / 2, unit - border, unit - border)
									.fill(cell.color)
									.stroke('black', border);
									
						if(cell.swappable)
							return new Rect((x * unit) + border / 2, (y * unit) + border / 2, unit - border, unit - border)
								.fill(cell.color)
								.stroke('white', border);
						
						if(cell.new)
							return new Rect(x * unit, y * unit, unit, unit)
								.fill('white')
								.animate('1s', {
									fillColor: cell.color
								});
						
						if(cell.removed)
							return new Rect(x * unit, y * unit, unit, unit)
								.fill(cell.color)
								.animate('1s', {
									fillColor: 'white'
								});
						
						return new Rect(x * unit, y * unit, unit, unit)
								.fill(cell.color);
					}
					
					function refresh(cols) {
						if(!container) {
							container = new Group().addTo(stage);
						} else {
							container.destroy();
							container = new Group().addTo(stage);
						}
						
						for(let x = 0; x < cols.length; x++) {
							for(let y = 0; y < cols[x].length; y++) {
								let c = cols[x][y];
								let rect = rectFactory(x,y, c);									
								rect.addTo(container);
								
								rect.on('click', function(_event) {																	
									stage.sendMessage('click', { item: c });									
								});
							}
						}
					}
					
					stage.sendMessage('ready', {});
				}
			}
		);
		
		this.setState({ board });
		board.hub = hub;
		
		board.on('load', function() {
			board.on('message:ready', function() {
				board.hub.emit('seed');
			});
			
			board.on('message:click', function(data) {
				board.hub.emit('click', data);
			});
		});
		
		this.draw(this.props);
	}
	componentWillReceiveProps(nextProps) {
		this.draw(nextProps);
	}
	draw(props) {
		if(!this.state || !this.state.board || !props || !props.columns)
			return;
			
		this.state.board.sendMessage('columns', props.columns);
		this.state.board.sendMessage('rows', props.rows); // to force eval..
	}
	render() {
		return <div id={BONSAINODEID}></div>
	}
}

Bonsai.contextTypes = {
	tree: propTypes.baobab
};

export default branch(Bonsai, {
	cursors: {
		state: [ 'game', 'state' ],
		columns: [ 'game', 'columns' ],
		rows: [ 'game', 'rows' ]
	}	
});