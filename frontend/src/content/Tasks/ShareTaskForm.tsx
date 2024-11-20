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
  FormControlLabel,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import config from "src/config";
import { useSnackbar } from "notistack";

interface ShareTaskForm {
  id: number | string | null;
  onClose: () => void;
}

function ShareTaskForm({ id, onClose }: ShareTaskForm) {
  const { t }: { t: any } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog maxWidth="sm" fullWidth open onClose={handleClose}>
      <DialogTitle>{t("Share Task")}</DialogTitle>
      <Formik
        initialValues={{
          username: "",
          permission: "view",
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string()
            .max(255)
            .required(t("The username field is required")),
          permission: Yup.string().required(
            t("The permission field is required"),
          ),
        })}
        onSubmit={async (
          values,
          { resetForm, setErrors, setStatus, setSubmitting },
        ) => {
          try {
            await fetch(`${config.apiUrl}/tasks/${id}/share`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
              body: JSON.stringify(values),
            });
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
          setFieldValue,
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
                  error={Boolean(touched.username && errors.username)}
                  fullWidth
                  helperText={touched.username && errors.username}
                  label={t("Enter username to share with")}
                  name="username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  variant="outlined"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={values.permission === "edit"}
                      onBlur={handleBlur}
                      onChange={() => {
                        setFieldValue(
                          "permission",
                          values.permission === "edit" ? "view" : "edit",
                        );
                      }}
                      name="permission"
                      value="edit"
                      color="primary"
                    />
                  }
                  label={t("Allow Edit Permission")}
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
                {t("Share Task")}
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
}

export default ShareTaskForm;
