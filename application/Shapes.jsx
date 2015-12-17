import React from 'react';

export const Square = (props) =>
<svg className="shape shape--square">
	<g className="shape__g" fill={props.color}>
		<rect className="shape__rect--square" ></rect>
	</g>
</svg>

export const Circle = (props) =>
<svg className="shape">
	<g className="shape__g" fill={props.color}>
		<circle className="shape__circle" cx="30" cy="30" r="15"></circle>
	</g>
</svg>

export const Triangle = (props) =>
<svg className="shape">
	<g className="shape__g" fill={props.color}>
		<polygon className="shape__polygon--triangle" points="15,15 45,15 30,45" ></polygon>
	</g>
</svg>

export const Rhombus = (props) =>
<svg className="shape">
	<g className="shape__g" fill={props.color}>
		<polygon className="shape__polygon--rhombus" points="30,10 10,30 30,50 50,30" ></polygon>
	</g>
</svg>

export const Octagon = (props) =>
<svg className="shape">
	<g className="shape__g" fill={props.color}>
		<polygon className="shape__polygon--octagon" points="20,10 40,10 50,20 50,40 40,50 20,50 10,40 10,20" ></polygon>
	</g>
</svg>

export const Diamond = (props) =>
<svg className="shape">
	<g className="shape__g" fill={props.color}>
		<polygon className="shape__polygon--diamond" points="10,20 20,10 40,10 50,20 30,50" ></polygon>
	</g>
</svg>

export const Hexagon = (props) =>
<svg className="shape">
	<g className="shape__g" fill={props.color}>
		<polygon className="shape__polygon--hexagon" points="30,10 50,20 50,40 30,50 10,40 10,20" ></polygon>
	</g>
</svg>