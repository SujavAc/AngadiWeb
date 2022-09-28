import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { formatDistance } from "date-fns";

const useStyles = makeStyles((theme) => ({
    itemGrid: {
        // marginTop: theme.spacing(1),
        padding: theme.spacing(2),
      },
      unitP: {
        marginTop: theme.spacing(1),
        padding: theme.spacing(2),
      },
    itemDiv: {
        display: "contents",
        padding: theme.spacing(2),
        },
    title: {
        color: "#000000",
        fontSize: 12,
        fontWeight: 500,
        marginTop: 4,
        },
    quantity: {
        color: "rgba(0,0,0,.8)",
        fontSize: 10,
        fontWeight: 500,
        },
  }));

  
export default function ResponsiveDialog(props) {
  const classes = useStyles(); 
  const [open, setOpen] = React.useState(false);
  const {children, notification, readNotification} = props;
  const theme = useTheme();
  const maxCount = 2;
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const handleClickOpen = () => {
    setOpen(true);
    if(notification.read){
      return null
    }else{
      readNotification(notification.id);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getItems = (cart) => {
    const items = [];
    if (!cart) return items;
    const citems = cart.split("|");
    citems.forEach((c) => {
      const sc = c.split(";");
      if (sc.length === 5)
        items.push({
          name: sc[0],
          quantity: parseInt(sc[1]),
          price: sc[2],
          variant: sc[3],
        });
    });
    return items;
  };

  const getItemsCount = (cart) => {
    return cart.split("|").length;
  };

  return (
    <div>
      <Button variant={notification.read ? "text" : "outlined"} color="primary" onClick={handleClickOpen}>
        {children}
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Notification Details"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {notification.content && (notification.content)}
          </DialogContentText>
          {notification.delivery && (
          <DialogContentText variant="caption">
            Your delivery address is "{notification.delivery && (notification.delivery)}". If you can't see your delivery address, please contact us immediately. Thank you.
            <br></br>
            {notification.amount && (
          <>
          <div className={classes.unitP}>{notification.date ? `${formatDistance(new Date(), notification.date)} ago` : ""} </div>
            
            <Grid item container className={classes.itemGrid} xs={12} sm={12}>

          {getItems(notification.orderDetails).map((item, idx) => {
              if (idx === maxCount) {
                return (
                  <Grid container justify="center">
                    <Grid className={classes.moreDiv} item xs="auto">
                      + {getItemsCount(notification.orderDetails) - maxCount} more
                    </Grid>
                  </Grid>
                );
              } else if (idx <= maxCount - 1) {
                return (
                  <div className={classes.itemDiv} key={idx}>
                    <Grid item xs={10}>
                      <div className={classes.title}>
                        {item.name} ({item.variant})
                      </div>
                      <div className={classes.quantity}>
                        Quantity: {item.quantity}{" "}
                      </div>
                    </Grid>
                    <Grid item xs={2} container justify="flex-end">
                      <div className={classes.unitP}>AUD {notification.amount} </div>
                    </Grid>
                  </div>
                );
              }
            })}
          </Grid>
          </>
        )}
          </DialogContentText>
          )}
        </DialogContent>
        
        
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary" variant="outlined">
            X
          </Button>
          {/* <Button onClick={handleClose} color="primary" autoFocus>
            Agree
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
