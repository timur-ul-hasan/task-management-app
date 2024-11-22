import { Box, Button, Container, Divider, Typography } from "@mui/material";
import CreateTaskDialog from "./TaskForm";
import { Helmet } from "react-helmet-async";
import reducer from "./reducer";
import { useEffect } from "react";
import { getAllTasks } from "./api";
import { Link as RouterLink } from "react-router-dom";
import TasksList from "./TaskList";

const TasksPage: React.FC = () => {
  const [state, dispatch] = reducer();

  const accessToken = localStorage.getItem("accessToken") || "";
  
  useEffect(() => {
    getAllTasks(dispatch, accessToken);
  }, [accessToken]);

  return (
    <Box>
      <Helmet>
        <title>Tasks Dashboard</title>
      </Helmet>
      <Container
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h1">My Tasks</Typography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            component={RouterLink}
            to="/shared-with-me"
          >
            Shared with me
          </Button>
          <Button
            variant="contained"
            onClick={() => dispatch({ type: "NEW_TASK" })}
          >
            Create New Task
          </Button>
        </Box>
      </Container>
      <Divider
        sx={{
          my: 2,
        }}
      />
      <TasksList state={state} dispatch={dispatch} />
      <CreateTaskDialog
        editTask={state.editTask}
        newTask={state.newTask}
        dispatch={dispatch}
      />
    </Box>
  );
};

export default TasksPage;
