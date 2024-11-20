import {
  Box,
  Button,
  Card,
  CardActions,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  IconButton,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import {
  Delete,
  Edit,
  ShareSharp,
  TodayTwoTone,
  ViewAgendaSharp,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { deleteTask, markAsDone } from "./api";
import ShareTaskForm from "./ShareTaskForm";
import { useState } from "react";
import useAuth from "src/hooks/useAuth";

interface TaskCardProps {
  task: Task;
  dispatch: StateDispatch;
}

function TaskCard({ task, dispatch }: TaskCardProps) {
  const { t }: { t: any } = useTranslation();
  const [share, setShare] = useState(false);
  const theme = useTheme();
  const { user } = useAuth();
  const edit: boolean =
    task.user_id === user?.id ||
    (task?.pivot?.user_id === user?.id && task?.pivot?.permission === "edit");

  return (
    <>
      <Card
        variant="outlined"
        sx={{
          p: 3,
          background:
            task.status === "pending"
              ? `${theme.colors.alpha.black[5]} `
              : `${theme.colors.alpha.white[5]} `,
          height: "100%",
          width: "100%",
          border: task.status === "completed" ? "2px solid green" : "none",
          transition: "border 200ms ease-in-out",
        }}
      >
        <Box
          sx={{
            display: "flex",
            mb: 2,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={task.status === "completed"}
                color="primary"
                onChange={() => markAsDone(dispatch, task)}
              />
            }
            label={t("Completed")}
          />
          <Chip
            color={task.status === "pending" ? "primary" : "success"}
            label={t(task.status.toUpperCase())}
          />
        </Box>

        <Typography display="flex" alignItems="center" variant="subtitle2">
          <TodayTwoTone
            sx={{
              mr: 1,
            }}
          />
          {new Date(task.created_at).toLocaleString()}
        </Typography>
        <Typography variant="h3" color="text.primary">
          {task.title}
        </Typography>
        <Divider
          sx={{
            my: 2,
          }}
        />
        <Typography
          sx={{
            pb: 2,
          }}
          color="text.secondary"
        >
          {task.description}
        </Typography>
        <Button
          size="small"
          variant="contained"
          startIcon={<ViewAgendaSharp />}
          component={RouterLink}
          to={`/task/${task.id}`}
        >
          {t("View task")}
        </Button>

        <Divider
          sx={{
            my: 2,
          }}
        />
        <CardActions
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {edit && (
              <Tooltip arrow title={t("Edit task")}>
                <IconButton
                  onClick={() => {
                    dispatch({ type: "EDIT_TASK", payload: task });
                  }}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
            )}
            {task.user_id === user?.id && (
              <Tooltip arrow title={t("Delete task")}>
                <IconButton onClick={() => deleteTask(dispatch, task.id)}>
                  <Delete color="error" />
                </IconButton>
              </Tooltip>
            )}
            {task.user_id === user?.id && (
              <Tooltip arrow title={t("Share task")}>
                <IconButton onClick={() => setShare(true)}>
                  <ShareSharp />
                </IconButton>
              </Tooltip>
            )}
          </Box>
          {/* <AvatarGroup>
          <Tooltip arrow title={t("View profile for") + " Remy Sharp"}>
            <Avatar
              sx={{
                width: 30,
                height: 30,
              }}
              component={RouterLink}
              to="#"
              alt="Remy Sharp"
              src="/static/images/avatars/3.jpg"
            />
          </Tooltip>
          <Tooltip arrow title={t("View profile for") + " Trevor Henderson"}>
            <Avatar
              sx={{
                width: 30,
                height: 30,
              }}
              component={RouterLink}
              to="#"
              alt="Trevor Henderson"
              src="/static/images/avatars/4.jpg"
            />
          </Tooltip>
        </AvatarGroup> */}
        </CardActions>
        {
          task.user_id !== user?.id && (
            <Typography variant="subtitle2" color="text.secondary">Shared Task</Typography>
          )
        }
      </Card>
      {share && <ShareTaskForm id={task.id} onClose={() => setShare(false)} />}
    </>
  );
}

export default TaskCard;
