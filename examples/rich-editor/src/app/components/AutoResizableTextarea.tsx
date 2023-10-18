import classNames from 'classnames';
import {
	ChangeEventHandler,
	ForwardedRef,
	TextareaHTMLAttributes,
	forwardRef,
	useEffect,
	useRef
} from 'react';
import { useMergeRefs } from '../hooks/use-merge-refs';

export const AutoResizableTextarea = forwardRef(function AutoResizableTextarea(
	{
		defaultValue,
		onChange,
		className,
		value,
		placeholder,
		...props
	}: TextareaHTMLAttributes<HTMLTextAreaElement>,
	ref: ForwardedRef<any>
) {
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const adjustTextareaHeight = () => {
		const textarea = textareaRef.current;
		if (textarea) {
			// Reset height to auto to calculate new height correctly
			textarea.style.height = 'auto';
			const newHeight = textarea.scrollHeight;
			textarea.style.height = newHeight + 'px';
		}
	};

	useEffect(() => {
		adjustTextareaHeight();
	});

	const handleChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
		adjustTextareaHeight();
		let sentValue = e.currentTarget.value;

		onChange!({
			...e,
			currentTarget: { ...e.currentTarget, value: sentValue }
		});
	};

	return (
		<>
			<textarea
				ref={useMergeRefs(ref, textareaRef)}
				className={classNames(
					className,
					'resize-none overflow-hidden outline-none'
				)}
				placeholder={placeholder}
				defaultValue={defaultValue}
				value={value}
				onChange={handleChange}
				{...props}
			/>
		</>
	);
});
