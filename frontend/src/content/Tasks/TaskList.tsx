import { Button, Grid2 as Grid, Typography } from "@mui/material";
import TaskCard from "./TaskCard";
import Logo from "src/components/Logo";
import { useNavigate } from "react-router";

interface TasksListProps {
  state: State;
  dispatch: StateDispatch;
}

const TasksList = ({ state, dispatch }: TasksListProps) => {
  const navigate = useNavigate();

  return (
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
      {state.tasks.length === 0 && !state.loading && (
        <Grid
          size={12}
          sx={{
            display: "grid",
            gap: 5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h1" textAlign="center">
            No shared tasks found
          </Typography>
          <Button variant="contained" onClick={() => navigate(-1)}>
            GO BACK
          </Button>
        </Grid>
      )}
      {/* <Grid size={12}>
        <Typography variant="h1">Pending Tasks</Typography>
      </Grid> */}
      {state.tasks.map((item: Task) => (
        <Grid
          size={{
            xs: 12,
            sm: 6,
            md: 4,
          }}
          key={item.id}
        >
          <TaskCard task={item} dispatch={dispatch} />
        </Grid>
      ))}
      {/* <Grid size={12}>
        <Typography variant="h1">Completed Tasks</Typography>
      </Grid>
      {state.tasks
        .filter((item: Task) => item.status === "completed")
        .map((item: Task) => (
          <Grid
            size={{
              xs: 12,
              sm: 6,
              md: 4,
            }}
            key={item.id}
          >
            <TaskCard task={item} dispatch={dispatch} />
          </Grid>
        ))} */}
    </Grid>
  );
};

export default TasksList;
