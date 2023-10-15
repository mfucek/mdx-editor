import classNames from 'classnames';
import { DragEvent, useState } from 'react';
import { Button } from './Button';

export const DraggableContainer = ({
	items,
	onDragged,
	leftControl,
	rightControl
}: {
	items: React.ReactNode[];
	leftControl: React.ReactNode[];
	rightControl: React.ReactNode[];
	onDragged: (i: number, j: number) => void;
}) => {
	const handleOnDrag = (e: DragEvent<HTMLDivElement>, draggedIndex: number) => {
		e.dataTransfer.setData('draggedIndex', draggedIndex.toString());
	};

	const handleOnDrop = (e: DragEvent, droppedIndex: number) => {
		const draggedIndex = e.dataTransfer.getData('draggedIndex');
		onDragged(Number(draggedIndex), droppedIndex);
	};

	const [dragFromIndex, setDragFromIndex] = useState<number | null>(null);
	const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

	return (
		<>
			{items.map((item, i) => {
				return (
					<div
						className={classNames(
							'relative group',
							i == dragFromIndex && 'opacity-10'
						)}
						key={i}
						onDrop={(e) => {
							handleOnDrop(e, i);
							setDragOverIndex(null);
						}}
						onDragOver={(e) => {
							setDragOverIndex(i);
							e.preventDefault();
						}}>
						<div
							className="h-full absolute flex justify-center items-center left-0 inset-y-0 md:-translate-x-full gap-1 group-hover:opacity-100 opacity-0 duration-100 px-4"
							draggable={items.length !== 1}
							onDragStart={(e) => {
								setDragFromIndex(i);
								handleOnDrag(e, i);
							}}
							onDragEnd={() => {
								setDragFromIndex(null);
								setDragOverIndex(null);
							}}>
							{leftControl[i]}
							<Button
								icon="grip"
								secondary
								ghost
								disabled={items.length === 1}
							/>
						</div>
						{item}
						{i == dragOverIndex && dragFromIndex! - dragOverIndex < 0 && (
							<div className="absolute left-0 bottom-0 inset-x-0 h-px bg-primary" />
						)}
						{i == dragOverIndex && dragFromIndex! - dragOverIndex > 0 && (
							<div className="absolute left-0 top-0 inset-x-0 h-px bg-primary" />
						)}

						<div
							key={i}
							className="h-full absolute flex gap-1 justify-center items-center right-0 inset-y-0 md:translate-x-full group-hover:opacity-100 opacity-0 duration-100 px-4">
							{rightControl[i]}
						</div>
					</div>
				);
			})}
		</>
	);
};
