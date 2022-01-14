import {
  Alert,
  AlertTitle,
} from "@mui/material";

export const Error404 = () => {
  return (
    <div className="Error">
      <Alert severity="error">
        <AlertTitle>ERROR 404</AlertTitle>
        <h2>Oops! This Page Could Not Be Found</h2>
        <p>Sorry but the page you are looking for does not exist</p>
      </Alert>
    </div>
  );
};