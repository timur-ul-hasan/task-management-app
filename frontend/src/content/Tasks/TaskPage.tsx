import {
  Box,
  Button,
  Container,
  Divider,
  Grid2 as Grid,
  Typography,
} from "@mui/material";
import CreateTaskDialog from "./TaskForm";
import { Helmet } from "react-helmet-async";
import TaskCard from "./TaskCard";
import reducer from "./reducer";
import { useEffect } from "react";
import { getTask } from "./api";
import Logo from "src/components/Logo";
import { useNavigate, useParams } from "react-router";
import image404 from "src/assets/404.svg";

const TaskPage: React.FC = () => {
  const [state, dispatch] = reducer();
  const navigate = useNavigate();
  const param = useParams();
  const id: string = param.id || "";

  useEffect(() => {
    getTask(dispatch, id);
  }, [id]);

  return (
    <Box>
      <Helmet>
        <title>Task Details</title>
      </Helmet>
      <Container
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h1">Task Details</Typography>
        <Button variant="contained" onClick={() => navigate(-1)}>
          GO BACK
        </Button>
      </Container>
      <Divider
        sx={{
          my: 2,
        }}
      />
      <Container>
        <Grid container spacing={2}>
          {state.loading && (
            <Grid
              size={12}
              sx={{
                display: "grid",
                gap: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Logo />
              <Typography variant="h1" textAlign="center">
                Loading...
              </Typography>
            </Grid>
          )}
          {state?.task && <TaskCard task={state?.task} dispatch={dispatch} />}
          {state?.error && (
            <Grid
              size={12}
              sx={{
                display: "grid",
                gap: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box textAlign="center">
                <img alt="404" height={180} src={image404} />
              </Box>
              <Typography variant="h1" textAlign="center">
                No task found
              </Typography>
              <Button variant="contained" onClick={() => navigate(-1)}>
                GO BACK
              </Button>
            </Grid>
          )}
        </Grid>
      </Container>

      <CreateTaskDialog
        editTask={state.editTask}
        newTask={state.newTask}
        dispatch={dispatch}
      />
    </Box>
  );
};

export default TaskPage;
