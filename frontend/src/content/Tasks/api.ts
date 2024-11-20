import config from "src/config";

const accessToken = localStorage.getItem("accessToken");

export const getAllTasks = async (dispatch: StateDispatch): Promise<void> => {
  try {
    dispatch({ type: "LOADING" });
    const res = await fetch(`${config.apiUrl}/tasks/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();
    dispatch({ type: "GET_ALL_TASKS", payload: data });
  } catch {
    dispatch({ type: "ERROR", payload: "Something went wrong" });
  } 
};

export const getSharedTasks = async (
  dispatch: StateDispatch,
): Promise<void> => {
  try {
    dispatch({ type: "LOADING" });
    const res = await fetch(`${config.apiUrl}/tasks/shared`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();
    dispatch({ type: "GET_ALL_TASKS", payload: data });
  } catch {
    dispatch({ type: "ERROR", payload: "Something went wrong" });
  }
};

export const getTask = async (
  dispatch: StateDispatch,
  id: string,
): Promise<void> => {
  try {
    dispatch({ type: "LOADING" });
    const res = await fetch(`${config.apiUrl}/task/${id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.json();
    dispatch({ type: "GET_TASK", payload: data });
  } catch {
    dispatch({ type: "ERROR", payload: "Something went wrong" });
  } 
};

export const deleteTask = async (
  dispatch: StateDispatch,
  id: string,
): Promise<void> => {
  try {
    await fetch(`${config.apiUrl}/delete-task/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    dispatch({ type: "DELETE", payload: id });
  } catch {
    dispatch({ type: "ERROR", payload: "Something went wrong" });
  }
};

export const markAsDone = async (
  dispatch: StateDispatch,
  task: Task,
): Promise<void> => {
  try {
    const res = await fetch(`${config.apiUrl}/update-task/${task?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        status: task.status === "pending" ? "completed" : "pending",
      }),
    });
    const data = await res.json();
    dispatch({ type: "UPDATE", payload: data });
  } catch {
    dispatch({ type: "ERROR", payload: "Something went wrong" });
  }
};
