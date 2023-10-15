'use client';

import { useState } from 'react';
import { RichEditor } from './components/RichEditor';

const initialText = `Hello this is a text

and this is another line
with an addition
with an addition
with an addition

And this is a new paragraph that is very long to the point that it will overflow the conta multiple times.

<CustomComponent> with some text </CustomComponent>

<CustomComponent2 values={["a", "b"]}/>

<Features
	features={[
		{
			src: "string",
			title: "string",
			description: "string"
		},
		{
			src: "string",
			title: "string",
			description: "string"
		}
	]}
/>

# This is a title

## This is a subtitle

### This is a subsubtitle

- This is a list
- This is another list`;

export default function Page() {
	const [text, setText] = useState(initialText);

	return (
		<>
			<RichEditor value={text} onChange={(e) => setText(e)} />
		</>
	);
}
