import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function GlobalDialog({children,buttonName,fullwidth,title,actionButton, agree}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {buttonName && (
        <Button variant="outlined" onClick={handleClickOpen} color="primary" fullWidth={fullwidth}>
          {buttonName}
        </Button>
      )}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        {title && (<DialogTitle>{title}</DialogTitle>)}
        <DialogContent>
          {/* <DialogContentText id="alert-dialog-slide-description"> */}
            {children}
          {/* </DialogContentText> */}
        </DialogContent>
        {actionButton ? (
          <DialogActions>
          <Button onClick={handleClose} variant="outlined" color="primary">x</Button>
          {agree && (<Button onClick={agree} variant="contained" color="primary">✓</Button>)}
        </DialogActions>
        ):(
          <></>
        )}
        
      </Dialog>
    </div>
  );
}