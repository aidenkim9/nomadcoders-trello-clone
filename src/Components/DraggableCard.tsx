import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
  background-color: ${(props) =>
    props.isDragging ? "#74b9ff" : props.theme.cardColor};
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 7px;
`;

interface DraggableCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

function DraggableCard({ toDoId, toDoText, index }: DraggableCardProps) {
  return (
    <Draggable key={toDoId} draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={Boolean(snapshot.isDragging)}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DraggableCard);
