import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";

interface IActionBarProps {
  onGetHintClick: () => {};
  onCompileClick: () => void;
  onNextClick: () => void;
  onRestartClick: () => void;
  isTest: boolean;
  succeeded: boolean;
  hintVisible: boolean;
}

export const ActionBar = ({
  onGetHintClick,
  onCompileClick,
  onNextClick,
  onRestartClick,
  isTest,
  succeeded,
  hintVisible,
}: IActionBarProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };
  return (
    <>
      <Box
        sx={{
          background: "#000",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ ml: 3 }}>
          <Tooltip title="Start over">
            <IconButton onClick={openDialog} sx={{ p: 0.5, color: "#FFF" }} aria-label="start-over">
              <RestartAltIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={onGetHintClick}
            disabled={hintVisible || succeeded}
          >
            Get Hint
          </Button>
          {!isTest && (
            <Button
              variant="contained"
              color="success"
              onClick={onCompileClick}
            >
              Compile
            </Button>
          )}
          {(succeeded || isTest) && (
            <Button variant="contained" color="secondary" onClick={onNextClick}>
              Next
            </Button>
          )}
        </Box>
      </Box>
      <Dialog
        open={dialogOpen}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Are you sure you want to start over?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you click 'OK', the app will be restarted and you will loose all your progress.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='error' onClick={closeDialog}>Cancel</Button>
          <Button variant='contained' onClick={onRestartClick} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
