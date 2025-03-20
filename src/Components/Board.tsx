import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { useForm } from "react-hook-form";
import { ITodo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.boardColor};
  padding-top: 20px;
  border-radius: 7px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 18px;
`;

const Area = styled.div<IAreaProps>`
  background-color: ${(props) =>
    props.isDraggingOver
      ? "#dfe6e9"
      : props.draggingFromThis
      ? "#b2bec3"
      : "transparent"};
  flex-grow: 1;
  transition: background-color 0.35s ease-in-out;
  padding: 15px;
  border-radius: 0px 0px 7px 7px;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
    text-align: center;
  }
`;

interface IForm {
  toDo: string;
}

interface IAreaProps {
  isDraggingOver: boolean;
  draggingFromThis: boolean;
}

interface IBoardProps {
  toDos: ITodo[];
  title: string;
  boardId: string;
}

function Board({ toDos, title, boardId }: IBoardProps) {
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ toDo }: IForm) => {
    const newTodoObj = { id: Date.now(), text: toDo };
    setToDos((allBoards) => {
      return {
        ...allBoards,
        [boardId]: [...allBoards[boardId], newTodoObj],
      };
    });
    setValue("toDo", "");
  };
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("toDo", { required: true })}
          type="text"
          placeholder={`Add to ${boardId}`}
        />
        <button>Add</button>
      </Form>
      <Droppable droppableId={boardId}>
        {(magic, info) => (
          <Area
            isDraggingOver={info.isDraggingOver}
            draggingFromThis={Boolean(info.draggingFromThisWith)}
            ref={magic.innerRef}
            {...magic.droppableProps}
          >
            {toDos.map((todo, index) => (
              <DraggableCard
                key={todo.id}
                toDoId={todo.id}
                toDoText={todo.text}
                index={index}
              />
            ))}
            {magic.placeholder}
          </Area>
        )}
      </Droppable>
    </Wrapper>
  );
}

export default Board;
