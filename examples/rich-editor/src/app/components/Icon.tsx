import classNames from 'classnames';
import React from 'react';

const icons = {
	search: '/assets/icons/search.svg',
	options: '/assets/icons/options.svg',
	linked: '/assets/icons/linked.svg',
	checkmark: '/assets/icons/checkmark.svg',
	close: '/assets/icons/close.svg',
	forward: '/assets/icons/forward.svg',
	back: '/assets/icons/back.svg',
	chevronUp: '/assets/icons/chevronUp.svg',
	chevronDown: '/assets/icons/chevronDown.svg',
	chevronLeft: '/assets/icons/chevronLeft.svg',
	chevronRight: '/assets/icons/chevronRight.svg',
	dropdownArrow: '/assets/icons/dropdownArrow.svg',
	delete: '/assets/icons/delete.svg',
	edit: '/assets/icons/edit.svg',
	blockAdd: '/assets/icons/blockAdd.svg',
	play: '/assets/icons/play.svg',
	image: '/assets/icons/image.svg',
	view3D: '/assets/icons/3d.svg',
	gallery: '/assets/icons/gallery.svg',
	features: '/assets/icons/features.svg',
	video: '/assets/icons/video.svg',
	code: '/assets/icons/code.svg',
	promptMagic: '/assets/icons/promptMagic.svg',
	grip: '/assets/icons/grip.svg',
};

export type IconName = keyof typeof icons;

export const Icon: React.FC<{
	icon: IconName;
	size?: string | number;
	invert?: boolean;
	className?: string;
}> = ({ icon, size, invert, className }) => {
	return (
		<div
			className={classNames(
				'transition-all duration-200 ease-in',
				'bg-neutral',
				className
			)}
			style={{
				height: size ? size : '24px',
				width: size ? size : '24px',
				WebkitMaskImage: `url('${icons[icon]}')`,
				maskImage: `url('${icons[icon]}')`,
				WebkitMaskRepeat: 'no-repeat',
				WebkitMaskSize: 'contain',
				WebkitMaskPosition: 'center center',
				maskRepeat: 'no-repeat',
			}}
		/>
	);
};

export default Icon;
