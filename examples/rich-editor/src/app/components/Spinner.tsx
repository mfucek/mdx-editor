import classnames from 'classnames';

export const Spinner = ({
	white,
	className,
}: {
	className?: string;
	white?: boolean;
}) => {
	return (
		<div
			className={classnames(
				// `inline-block h-4 w-4 animate-spinner border-b-2 border-r-2`,
				'h-4 w-4 animate-spinner rounded-full border-2 border-t-neutral',
				white
					? 'border-special-white border-t-special-white/40'
					: 'border-neutral-medium border-t-neutral',
				className
			)}
		/>
	);
};
