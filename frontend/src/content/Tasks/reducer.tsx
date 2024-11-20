import { useReducer } from "react";

const initialState: State = {
  loading: false,
  newTask: false,
  tasks: [],
  task: null,
  editTask: null,
  error: null,
};

const _reducer = (state: State, action: StateAction) => {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true };
    case "NEW_TASK":
      return { ...state, newTask: true };
    case "ADD":
      return { ...state, tasks: [...state.tasks, action.payload] };
    case "UPDATE":
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task.id === action.payload.id) {
            return action.payload;
          }
          return task;
        }),
        task: action.payload,
      };
    case "DELETE":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "GET_ALL_TASKS":
      return { ...state, tasks: action.payload, loading: false };

    case "GET_TASK":
      return { ...state, task: action.payload, loading: false };
    case "EDIT_TASK":
      return { ...state, editTask: action.payload };
    case "ERROR":
      return { ...state, error: action.payload };

    case "MODAL_CLOSE":
      return { ...state, newTask: false, editTask: null, shareTask: null };
    default:
      return state;
  }
};

export default () => useReducer(_reducer, initialState);
