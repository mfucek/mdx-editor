import classNames from 'classnames';
import React, { Ref, forwardRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { Button } from './Button';

interface EditorLineProps {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	onClick: (e: React.MouseEvent<HTMLTextAreaElement>) => void;
	onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
	ref: Ref<HTMLTextAreaElement>;
}

export const EditorLine = forwardRef(function EditorLine(
	{ value, onChange, onKeyDown, onClick }: EditorLineProps,
	ref: Ref<HTMLTextAreaElement>
) {
	// if (value.startsWith('<Features') && value.endsWith('/>')) {
	// 	return <FeaturesLine value={value} onChange={onChange} />;
	// }
	// if (value.startsWith('<CustomComponent2') && value.endsWith('/>')) {
	// 	return <p>{value}</p>;
	// }

	const handlePrompt = async (i: number) => {
		const text = await prompt(value);
		// setGptResult({ message: text, row: i });
	};

	const handleReplace = (
		type: 'image' | 'code' | 'gallery' | 'features' | 'video' | 'code' | '3d'
	) => {
		let out = '';
		if (type == 'image') {
			out = `![alt]( )`;
		}
		if (type == 'gallery') {
			out = `<Gallery images={[
	{
		src: "",
		alt: ""
	},
] />`;
		}
		if (type == 'video') {
			out = `<Video src="" />`;
		}
		if (type == 'code') {
			out = `<Code>\n\n<Code />`;
		}
		if (type == '3d') {
			out = `<3D src="" />`;
		}
		if (type == 'features') {
			out = `<Features features={[
				{
					title: "",
					description: "",
				},
			]} />`;
		}
		onChange({
			target: { value: out }
		} as React.ChangeEvent<HTMLTextAreaElement>);
	};

	const isCustomComponent = value.startsWith('<') && value.endsWith('>');
	return (
		<>
			<div className="w-full flex gap-2">
				<TextareaAutosize
					ref={ref}
					value={value}
					onChange={onChange}
					onKeyDown={onKeyDown}
					onClick={onClick}
					className={classNames(
						'w-full hover:bg-neutral-weak bg-transparent py-2 px-4 rounded-lg outline-none resize-none',
						isCustomComponent && 'font-mono body-2 text-primary'
					)}
				/>
				{value == '' && (
					<>
						<div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] flex gap-4">
							<Button
								icon="image"
								ghost
								onClick={() => handleReplace('image')}
							/>
							<Button
								icon="gallery"
								ghost
								onClick={() => handleReplace('gallery')}
							/>
							<Button
								icon="video"
								ghost
								onClick={() => handleReplace('video')}
							/>
							<Button
								icon="features"
								ghost
								onClick={() => handleReplace('features')}
							/>
							<Button icon="view3D" ghost onClick={() => handleReplace('3d')} />
						</div>
					</>
				)}
			</div>
		</>
	);
});

const FeaturesLine = ({
	value
}: {
	value: string;
	onChange: (line: string) => void;
}) => {
	const [content, setContent] =
		useState<{ src?: string; title: string; description?: string }[]>();

	const decodeValue = (value: string) => {
		// get value between {[ and ]}
		const featuresRaw = /(?<=features\s*=\s*\{\[)(\s|\S)*?(?=\]\})/g;
		const f1 = value.match(featuresRaw)![0];
		console.log(f1);

		const withinObject = /(?<=\{\s+)(\s|\S)+?(?=\s+\})/g;
		const f3 = withinObject.exec(f1!)!;
		console.log('f3', f3);
	};

	// decodeValue(value);

	const encodeValue = (
		values: { src?: string; title: string; description?: string }[]
	) => {
		const encodedValues = values.map((value) => '');
		return `<Features features={[
	${encodedValues.join(',\n')}
]} />`;
	};

	// console.log(encodeValue([{ title: 'test', description: 'test' }]));

	return (
		<>
			<div className="bg-neutral-weak">Features</div>
			{/* <p>{valueFeatures}</p> */}
			{/* <div className="grid grid-cols-12 gap-4">
				{content.map((feature, i) => (
					<div
						key={i}
						className={classNames(
							'relative w-full rounded-2xl overflow-hidden bg-section flex flex-col justify-between',
							'col-span-6',
							content.length != 2
								? content.length - 1 == i && i % 2 == 0 && '!col-span-12'
								: ''
						)}
					>
						<div className="p-10 flex flex-col gap-3">
							<p className="title-2">{feature.title}</p>
							{feature.description && (
								<p className="body text-neutral-strong">
									{feature.description}
								</p>
							)}
						</div>
						{feature.src && (
							<img src={feature.src} className="w-full" alt={feature.title} />
						)}
					</div>
				))}
			</div> */}
		</>
	);
};

const imageGalleryTemplate = {
	rootNode: `
<Gallery images={[
	{
		src: "",
		alt: ""
	},
]} />`,
	name: 'Gallery',
	description: 'Gallery of images'
};
