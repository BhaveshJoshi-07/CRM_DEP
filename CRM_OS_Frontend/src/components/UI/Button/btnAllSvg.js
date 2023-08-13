import React from "react";

const BtnAllSvg = ({ size, title }) => {
	return (
		<div className='flex justify-between items-center'>
			<svg
				fill='#ffffff'
				width={`${size}px`}
				height={`${size}px`}
				viewBox='0 0 52 52'
				xmlns='http://www.w3.org/2000/svg'
				enable-background='new 0 0 52 52'>
				<g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
				<g
					id='SVGRepo_tracerCarrier'
					strokeLinecap='round'
					strokeLinejoin='round'></g>
				<g id='SVGRepo_iconCarrier'>
					<path d='M31.6,21.6c-1.2,0-2.2-1-2.2-2.2V5.5c0-1.2,1-2.2,2.2-2.2h14.2c1.2,0,2.2,1,2.2,2.2v13.9c0,1.2-1,2.2-2.2,2.2H31.6z' />
					<path d='M37.7,29.8l-8.2,8.9c-0.5,0.5-0.5,1.3,0,1.9l8.2,8.9c0.5,0.6,1.5,0.6,2,0l8.2-8.9c0.5-0.5,0.5-1.3,0-1.9 l-8.2-8.9C39.2,29.2,38.3,29.2,37.7,29.8z' />
					<circle cx='13' cy='39.4' r='9.3' />
					<path d='M4.8,6.5l7.2-4.1c0.7-0.4,1.5-0.4,2.1,0l7.1,4.1c0.7,0.4,1.1,1.1,1.1,1.9v8.2c0,0.8-0.4,1.5-1.1,1.9l-7.1,4.1c-0.7,0.4-1.5,0.4-2.1,0l-7.2-4.1c-0.7-0.4-1.1-1.1-1.1-1.9V8.4C3.7,7.6,4.1,6.9,4.8,6.5z' />
				</g>
			</svg>
			<p className='ml-1'>{title}</p>
		</div>
	);
};

export default BtnAllSvg;
