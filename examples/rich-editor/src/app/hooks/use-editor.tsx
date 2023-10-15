import { KeyboardEvent, createRef, useEffect, useRef, useState } from 'react';

type BaseHtmlElement = Pick<
	HTMLTextAreaElement,
	keyof HTMLElement | 'focus' | 'setSelectionRange' | 'selectionStart' | 'value'
>;

const createSection = <TElement extends BaseHtmlElement = HTMLTextAreaElement>(
	content: string
) => ({
	content,
	ref: createRef<TElement>(),
	key: Math.random().toString(36).substring(7),
});

const getInitState = <TElement extends BaseHtmlElement = HTMLTextAreaElement>(
	value: string
) => {
	return value.split('\n\n').map(createSection<TElement>);
};

type Section<TElement extends BaseHtmlElement = HTMLTextAreaElement> =
	ReturnType<typeof getInitState<TElement>>[number];

const splitLineByNewLines = <
	TElement extends BaseHtmlElement = HTMLTextAreaElement,
>(
	sectionContent: string,
	prevSections: Section<TElement>[],
	i: number
) => {
	const newSections = [...prevSections];
	// split line into two
	const [firstSection, secondSection] = sectionContent.split('\n\n');
	newSections[i].content = firstSection;
	// insert second line
	newSections.splice(i + 1, 0, createSection<TElement>(secondSection));
	return newSections;
};

// add next line to the end of current
const mergeNextLine = <TElement extends BaseHtmlElement = HTMLTextAreaElement>(
	sections: Section<TElement>[],
	i: number
) => {
	const newSections = [...sections];
	newSections[i] = {
		...newSections[i],
		content: newSections[i].content + newSections[i + 1].content,
	};
	newSections.splice(i + 1, 1);
	return newSections;
};

export const useEditorSections = <
	TElement extends BaseHtmlElement = HTMLTextAreaElement,
>(
	initValue: string
) => {
	const [sections, setSections] = useState(() =>
		getInitState<TElement>(initValue)
	);

	const [selectedIndex, setSelectedIndex] = useState(0);
	const selectedSection = sections[selectedIndex];

	useEffect(() => {
		if (!selectedSection) return;

		selectedSection.ref.current?.focus();
	}, [selectedSection]);

	const cursorPosition = useRef(-1);
	useEffect(() => {
		const newPos = cursorPosition.current;
		if (newPos == -1) return;

		setTimeout(() => {
			selectedSection.ref.current?.setSelectionRange(newPos, newPos);
		});
		cursorPosition.current = -1;
	}, [selectedSection]);

	const handleLineKey = (e: KeyboardEvent<TElement>, i: number) => {
		if (!sections[i]) return;

		const { content: line, ref } = sections[i];

		const pos = ref.current?.selectionStart;
		const sym = pos && pos != 0 ? line[pos - 1] : '';
		const row = line.slice(0, pos).split('\n').length - 1;
		const totalRows = line.split('\n').length - 1;

		// if in first row of input field
		if (e.key == 'ArrowUp' && i != 0) {
			if (row == 0) {
				setSelectedIndex(i - 1);
			}
		}

		if (e.key == 'ArrowDown' && i != sections.length - 1) {
			if (row == totalRows) {
				setSelectedIndex(i + 1);
			}
		}

		if (e.key == 'ArrowLeft' && i != 0) {
			if (pos == 0) {
				cursorPosition.current = sections[i - 1].content.length + 1;
				setSelectedIndex(i - 1);
			}
		}

		if (e.key == 'ArrowRight' && i != sections.length - 1) {
			if (pos == line.length) {
				cursorPosition.current = 0;
				setSelectedIndex(i + 1);
			}
		}

		if (e.key == 'Backspace' && pos == 0 && i != 0) {
			e.preventDefault();

			// set cursor position to the end of previous line
			cursorPosition.current = sections[i - 1].content.length;
			// merge with previous line
			setSections((prevSections) => mergeNextLine(prevSections, i - 1));
			// focus on previous line
			setSelectedIndex(i - 1);
		}
	};

	const handleLineChange = (line: string, i: number) => {
		const shouldSplit = line.includes('\n\n');

		setSections((sections) => {
			if (sections[i].content == line) return sections;

			if (shouldSplit) {
				return splitLineByNewLines(line, sections, i);
			}

			const newLines = [...sections];
			newLines[i] = {
				...newLines[i],
				content: line,
			};
			return newLines;
		});

		setSelectedIndex(shouldSplit ? i + 1 : i);
	};

	return {
		sections,
		selectedSection,
		getKeyDownHandler: (i: number) => (e: React.KeyboardEvent<TElement>) => {
			handleLineKey(e, i);
		},
		getChangeHandler: (i: number) => (e: React.ChangeEvent<TElement>) => {
			handleLineChange(e.target.value, i);
		},
		getClickHandler: (i: number) => (e: React.MouseEvent<TElement>) => {
			setSelectedIndex(i);
		},
		deleteSection: (i: number) => {
			setSections((sections) => {
				const newSections = [...sections];
				newSections.splice(i, 1);
				return newSections;
			});

			return sections[i];
		},
		replaceSection: (i: number, section: string | Section<TElement>) => {
			setSections((sections) => {
				const newSections = [...sections];
				newSections[i] =
					typeof section === 'string' ? createSection(section) : section;
				return newSections;
			});
		},
		insertSection: (i: number, section: string | Section<TElement>) => {
			setSections((sections) => {
				const newSections = [...sections];
				newSections.splice(
					i,
					0,
					typeof section === 'string' ? createSection(section) : section
				);
				return newSections;
			});
		},
	};
};
