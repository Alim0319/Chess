import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PropTypes from "prop-types";

export default function CustomDialog({
  open,
  children,
  title,
  contentText,
  handleContinue,
}) {
  return (
    <Dialog open={open}>
      {" "}
      {/*dialog container*/}
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {" "}
        {/* Main body of modal/dialog */}
        <DialogContentText>
          {" "}
          {/* main text */}
          {contentText}
        </DialogContentText>
        {children} {/* Other content */}
      </DialogContent>
      <DialogActions>
        {" "}
        {/* Dialog action buttons */}
        {/* Force users to make input without option to cancel */}
        {/* <Button onClick={handleClose}>Cancel</Button> */}
        <Button onClick={handleContinue}>Continue</Button>
      </DialogActions>
    </Dialog>
  );
}
CustomDialog.propTypes = {
  open: PropTypes.bool.isRequired, // Validate that 'open' is a boolean and is required
  children: PropTypes.node, // You can specify other prop types here
  title: PropTypes.string,
  contentText: PropTypes.string,
  handleContinue: PropTypes.func,
};
