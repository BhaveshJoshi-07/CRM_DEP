import React from "react";

const BtnViewSvg = ({ size, title }) => {
	return (
		<div className='flex justify-between items-center'>
			<svg
				width={`${size}px`}
				height={`${size}px`}
				viewBox='0 0 24 24'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'>
				<g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
				<g
					id='SVGRepo_tracerCarrier'
					strokeLinecap='round'
					strokeLinejoin='round'></g>
				<g id='SVGRepo_iconCarrier'>
					{" "}
					<path
						fill-rule='evenodd'
						clip-rule='evenodd'
						d='M20.7703 12C20.7703 11.6412 20.5762 11.4056 20.188 10.9343C18.768 9.21014 15.6357 6 12 6C8.36428 6 5.23207 9.21014 3.81198 10.9343C3.42382 11.4056 3.22974 11.6412 3.22974 12C3.22974 12.3588 3.42382 12.5944 3.81198 13.0657C5.23207 14.7899 8.36428 18 12 18C15.6357 18 18.768 14.7899 20.188 13.0657C20.5762 12.5944 20.7703 12.3588 20.7703 12ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3432 9 9.00002 10.3431 9.00002 12C9.00002 13.6569 10.3432 15 12 15Z'
						fill='#ffffff'></path>{" "}
				</g>
			</svg>
			<p className=''>{title}</p>
		</div>
	);
};

export default BtnViewSvg;
