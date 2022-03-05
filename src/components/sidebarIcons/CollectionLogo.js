import React from 'react';

const CollectionLogo = ({ selected = false, size = 24 }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			xmlnsXlink='http://www.w3.org/1999/xlink'
			width={size}
			height={size}
			viewBox='0 0 18 18'>
			<defs>
				<rect id='collection-logo-rect-1' width='18' height='18' x='0' y='0' />
				<mask id='collection-logo-mask-2' maskContentUnits='userSpaceOnUse' maskUnits='userSpaceOnUse'>
					<rect width='18' height='18' x='0' y='0' fill='black' />
					<use fill='white' xlinkHref='#collection-logo-rect-1' />
				</mask>
				<path
					id='collection-logo-path-3'
					fillRule='evenodd'
					d='M15 1.5H6c-.82500076 0-1.5.67499924-1.5 1.5v9c0 .82500076.67499924 1.5 1.5 1.5h9c.82500076 0 1.5-.67499924 1.5-1.5V3c0-.82500076-.67499924-1.5-1.5-1.5zM7.5 5.25h6c.41250038 0 .75-.33749962.75-.75s-.33749962-.75-.75-.75h-6c-.41250038 0-.75.33749962-.75.75s.33749962.75.75.75zM2.25 4.5c-.41250038 0-.75.33749962-.75.75V15c0 .82500076.67499924 1.5 1.5 1.5h9.75c.41250038 0 .75-.33749962.75-.75s-.33749962-.75-.75-.75h-9c-.41250038 0-.75-.33749962-.75-.75v-9c0-.41250038-.33749962-.75-.75-.75zM7.5 8.25h6c.41250038 0 .75-.33749962.75-.75s-.33749962-.75-.75-.75h-6c-.41250038 0-.75.33749962-.75.75s.33749962.75.75.75zm3 3h-3c-.41250038 0-.75-.33749962-.75-.75s.33749962-.75.75-.75h3c.41250038 0 .75.33749962.75.75s-.33749962.75-.75.75z'
				/>
				<mask
					id='collection-logo-mask-4'
					x='0'
					y='0'
					maskContentUnits='userSpaceOnUse'
					maskUnits='userSpaceOnUse'>
					<rect width='18' height='18' x='0' y='0' fill='white' />
					<use fill='black' xlinkHref='#collection-logo-path-3' />
				</mask>
			</defs>
			<g>
				<use fill='none' xlinkHref='#collection-logo-rect-1' />
				<g mask='url(#collection-logo-mask-2)'>
					<use
						fillOpacity='0'
						stroke={selected ? 'var(--sidebar-selected-icon-color)' : 'var(--sidebar-icon-color)'}
						strokeLinecap='butt'
						strokeLinejoin='miter'
						strokeWidth='2'
						mask='url(#collection-logo-mask-4)'
						xlinkHref='#collection-logo-path-3'
					/>
				</g>
			</g>
		</svg>
	);
};

export default CollectionLogo;
