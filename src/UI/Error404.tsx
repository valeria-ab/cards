import {
  Alert,
  AlertTitle,
} from "@mui/material";
import s from "./Error404.module.scss";

export const Error404 = () => {
  return (
    <div className={s.Error}>
      <Alert  className={s.Error} severity="error">
        <AlertTitle className={s.AlertError}>ERROR 404</AlertTitle>
        <h2 className={s.AlertTitle}>Oops! This Page Could Not Be Found</h2>
        <p className={s.TextTitle}>Sorry but the page you are looking for does not exist</p>
      </Alert>
    </div>
  );
};