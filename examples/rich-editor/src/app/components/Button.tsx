import classNames from 'classnames';
import { MouseEventHandler } from 'react';
import Icon, { IconName } from './Icon';
import { Spinner } from './Spinner';

export const Button = ({
	label,
	onClick,
	icon,
	large,
	outline,
	ghost,
	className,
	secondary,
	disabled,
	type,
	tabIndex,
	loading
}: {
	label?: string;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	icon?: IconName;
	large?: boolean;
	outline?: boolean;
	ghost?: boolean;
	className?: string;
	secondary?: boolean;
	disabled?: boolean;
	type?: 'submit';
	tabIndex?: number;
	loading?: boolean;
}) => {
	return (
		<>
			<button
				tabIndex={tabIndex}
				type={type || undefined}
				disabled={disabled}
				onClick={onClick}
				className={classNames(
					//sizing
					'relative flex',
					large ? 'px-6 h-[52px] button-large' : 'px-6 h-[40px] button-small',
					!disabled && 'hoverable',
					disabled && 'opacity-50',
					'duration-300 active:duration-100',
					outline
						? // outline
						  secondary
							? 'border border-neutral-medium text-neutral'
							: 'border border-primary-medium text-neutral'
						: ghost
						? // ghost
						  secondary
							? 'bg-neutral-weak text-special-white'
							: 'bg-primary-weak text-special-white'
						: secondary
						? // default
						  'bg-neutral text-special-white'
						: 'bg-primary text-special-white',
					// hover effects
					!disabled
						? outline
							? secondary
								? 'hover:bg-neutral-medium'
								: 'hover:bg-primary-medium'
							: ghost
							? secondary
								? ''
								: ''
							: secondary
							? ''
							: ''
						: '',
					'rounded-full',
					icon && !label && '!p-0',
					'justify-center align-middle',
					icon && !label && (large ? 'w-[52px]' : 'w-[40px]'),
					'rounded-full',
					className
				)}>
				<div
					className={classNames(
						'flex flex-col justify-center h-full',
						loading && 'opacity-0'
					)}>
					{label}
				</div>

				{icon && (
					<div className="flex flex-col justify-center h-full">
						<Icon icon={icon} />
					</div>
				)}

				{loading && (
					<>
						<div className="absolute inset-0 flex justify-center items-center">
							<Spinner />
						</div>
					</>
				)}
			</button>
		</>
	);
};
