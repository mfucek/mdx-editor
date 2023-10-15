import { Fragment, useEffect, useLayoutEffect, useState } from 'react';

import classNames from 'classnames';
import React from 'react';
import { useEditorSections } from '../hooks/use-editor';
import { Button } from './Button';
import { DraggableContainer } from './DraggableContainer';
import { EditorLine } from './EditorLine';

// 1. kako dodati undo?
// 2. bug: na prvi klik input ref kaze da je pozicija 0
// 3. detekcija predefiniranih komponenti
// 4. enkodiranje predefiniranih komponenti
// 5. manual edit komponente / trash
// 6. fix scrolling on rerender

const useSafeLayoutEffect =
	typeof window !== 'undefined' ? useLayoutEffect : useEffect;

interface RichEditorProps {
	value: string;
	onChange: (body: string) => void;
}

export const RichEditor: React.FC<RichEditorProps> = ({ value, onChange }) => {
	const {
		sections: lines,
		getChangeHandler,
		getClickHandler,
		getKeyDownHandler,
		deleteSection,
		insertSection,
		replaceSection
	} = useEditorSections(value);

	const onChangeRef = React.useRef(onChange);
	useSafeLayoutEffect(() => {
		onChangeRef.current = onChange;
	});
	useEffect(() => {
		onChangeRef.current(lines.map((l) => l.content).join('\n\n'));
	}, [lines]);

	const [gptResult, setGptResult] = useState<{
		message: string;
		row: number;
	} | null>(null);

	const prompt = async (line: string) => {
		// put your OpenAI logic here

		// const result = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
		// 	},
		// 	body: JSON.stringify({
		// 		prompt: line,
		// 		max_tokens: 100,
		// 		temperature: 0.7,
		// 		top_p: 1,
		// 		n: 1,
		// 		stream: false,
		// 		logprobs: null,
		// 		stop: ['\n'],
		// 	}),
		// }).then((r) => r.json());
		// return result.choices[0].text;

		return line;
	};

	const handlePrompt = async (i: number, line: string) => {
		const text = await prompt(line);
		setGptResult({ message: text, row: i });
	};

	return (
		<>
			<div className="m-10 mx-40 flex flex-col bg-section py-2 rounded-xl">
				<DraggableContainer
					items={lines.map((line, i) => (
						<>
							<EditorLine
								key={line.key}
								ref={line.ref}
								value={line.content}
								onKeyDown={getKeyDownHandler(i)}
								onChange={getChangeHandler(i)}
								onClick={getClickHandler(i)}
							/>

							{gptResult?.row == i && (
								<div
									className={classNames(
										'large text-neutral-strong py-4 mx-3 mt-1 mb-4 px-4 font-mono border border-primary-medium rounded-xl outline-none animate-fadein relative'
									)}>
									<div className="absolute w-4 h-[8px] left-4 top-0 -translate-y-[9px] overflow-hidden">
										<div className="w-4 h-4 rotate-45 bg-primary-medium absolute top-[4px]" />
									</div>
									<div className="flex justify-between mb-2">
										<span
											className="text-primary button-large hoverable cursor-pointer"
											onClick={() => {
												// handleLineChange(gptResult.message, i);
												replaceSection(i, gptResult.message);
												setGptResult(null);
											}}>
											Replace
										</span>
										<span
											className="text-primary button-large hoverable cursor-pointer"
											onClick={() => {
												setGptResult(null);
											}}>
											Clear
										</span>
									</div>
									<span>{gptResult?.message}</span>
								</div>
							)}
						</>
					))}
					leftControl={lines.map((line, i) => (
						<Fragment key={line.key + 'left-control'}>
							<Button
								icon="blockAdd"
								secondary
								ghost
								onClick={() => {
									insertSection(i + 1, '');
								}}
							/>
						</Fragment>
					))}
					rightControl={lines.map((line, i) => (
						<React.Fragment key={i}>
							<Button
								icon="promptMagic"
								secondary
								ghost
								onClick={() => {
									handlePrompt(i, line.content);
								}}
							/>
							<Button
								icon="delete"
								secondary
								ghost
								disabled={lines.length === 1 && line.content === ''}
								onClick={() => {
									deleteSection(i);

									if (lines.length === 1) {
										insertSection(0, '');
									}
								}}
							/>
						</React.Fragment>
					))}
					onDragged={(i, j) => {
						const draggedSection = deleteSection(i);
						insertSection(j, draggedSection);
					}}
				/>
			</div>
		</>
	);
};
