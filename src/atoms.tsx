import { atom } from "recoil";

export interface ITodo {
  id: number;
  text: string;
}

interface ItoDoState {
  [key: string]: ITodo[];
}

export const toDoState = atom<ItoDoState>({
  key: "todos",
  default: {
    "TO DO": [],
    DOING: [],
    DONE: [],
  },
});
