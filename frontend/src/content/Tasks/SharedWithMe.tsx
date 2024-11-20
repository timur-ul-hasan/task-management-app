import { Box, Button, Container, Divider, Typography } from "@mui/material";
import CreateTaskDialog from "./TaskForm";
import { Helmet } from "react-helmet-async";
import reducer from "./reducer";
import { useEffect } from "react";
import { getSharedTasks } from "./api";
import { useNavigate } from "react-router";
import TasksList from "./TaskList";

const TasksPage: React.FC = () => {
  const [state, dispatch] = reducer();
  const navigate = useNavigate();

  useEffect(() => {
    getSharedTasks(dispatch);
  }, []);

  return (
    <Box>
      <Helmet>
        <title>Shared With Me</title>
      </Helmet>
      <Container
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h1">Shared With Me - Tasks</Typography>
        <Button variant="contained" onClick={() => navigate(-1)}>
          GO BACK
        </Button>
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
