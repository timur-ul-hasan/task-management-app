import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import { useTranslation } from "react-i18next";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  CircularProgress,
  Stack,
  TextField,
} from "@mui/material";
import config from "src/config";
import { useSnackbar } from "notistack";

export interface CreateTaskDialog {
  editTask: Task | null;
  newTask: boolean;
  dispatch: StateDispatch;
}

function CreateTaskDialog({ editTask, newTask, dispatch }: CreateTaskDialog) {
  const { t }: { t: any } = useTranslation();
  const open: boolean = Boolean(editTask?.id || newTask);
  const isEdit: boolean = Boolean(editTask?.id);
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    dispatch({ type: "MODAL_CLOSE" });
  };

  return (
    <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose}>
      <DialogTitle>{t(isEdit ? "Edit Task" : "Create New Task")}</DialogTitle>
      <Formik
        initialValues={{
          title: editTask?.title ?? "",
          description: editTask?.description ?? "",
          status: editTask?.status ?? "pending",
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string()
            .max(255)
            .required(t("The title field is required")),
          description: Yup.string().required(
            t("The description field is required"),
          ),
        })}
        onSubmit={async (
          values,
          { resetForm, setErrors, setStatus, setSubmitting },
        ) => {
          try {
            if (isEdit) {
              const res = await fetch(`${config.apiUrl}/update-task/${editTask?.id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem(
                    "accessToken",
                  )}`,
                },
                body: JSON.stringify(values),
              });
              const data = await res.json();
              dispatch({ type: "UPDATE", payload: data });
            } else {
              const res = await fetch(`${config.apiUrl}/create-task/`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem(
                    "accessToken",
                  )}`,
                },
                body: JSON.stringify(values),
              });
              const data = await res.json();
              dispatch({ type: "ADD", payload: data });
            }

            handleClose();
            resetForm();
            setStatus({ success: true });
            setSubmitting(false);
          } catch (err: any) {
            setStatus({ success: false });
            setErrors(err);
            enqueueSnackbar(err.message, { variant: "error" });
            setSubmitting(false);
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }) => (
          <form onSubmit={handleSubmit}>
            <DialogContent
              dividers
              sx={{
                p: 3,
              }}
            >
              <Stack spacing={2}>
                <TextField
                  error={Boolean(touched.title && errors.title)}
                  fullWidth
                  helperText={touched.title && errors.title}
                  label={t("Title")}
                  name="title"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.title}
                  variant="outlined"
                />

                <TextField
                  error={Boolean(touched.description && errors.description)}
                  fullWidth
                  helperText={touched.description && errors.description}
                  label={t("Description")}
                  name="description"
                  multiline
                  rows={4}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  variant="outlined"
                />
              </Stack>
            </DialogContent>
            <DialogActions
              sx={{
                p: 3,
              }}
            >
              <Button color="secondary" onClick={handleClose}>
                {t("Cancel")}
              </Button>
              <Button
                type="submit"
                startIcon={
                  isSubmitting ? <CircularProgress size="1rem" /> : null
                }
                disabled={isSubmitting}
                variant="contained"
              >
                {t(isEdit ? "Update Task" : "Create Task")}
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
}

export default CreateTaskDialog;
