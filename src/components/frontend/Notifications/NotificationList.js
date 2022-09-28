import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { formatDistance } from "date-fns";
import DeleteIconDialog from '../../common/DeleteIconDialog';
import { Grid } from '@material-ui/core';
import ResponsiveDialog from './NotificationDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100%',
  },
  inline: {
    display: 'inline',
  },
  dialogs: {
      position: 'absolute',
      right: 10,
      bottom: -15,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'right',
      alignContent: 'right',
      alignItems: 'right',
  },
}));

export default function NotificationList(props) {
  const classes = useStyles();
  const { notification, deleteNotification, readNotification } = props;

  return (
    <List className={classes.root}>
        <ResponsiveDialog notification={notification} readNotification={readNotification}>
      <ListItem alignItems="flex-start" className={classes.listItem}>
        <ListItemAvatar>
          <Avatar alt={notification.name ? notification.name : ""} src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={notification.content ? notification.content : ""}
          secondary={
            <React.Fragment>
                <br></br>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {notification.date ? `${formatDistance(new Date(), notification.date)} ago` : ""}
              </Typography>
              
            </React.Fragment>
          }
        />
      </ListItem>
      </ResponsiveDialog>
      <Grid container>
                  <Grid item xs={12}>
                    
                  </Grid>
                  <Grid item xs={12}>
                      <div className={classes.dialogs}>
                    <DeleteIconDialog
                        alertText = "Are you sure want to delete this notifications?" 
                        callbackDelete={()=>deleteNotification(notification.id)}
                    />
                    {/* <GlobalDialog actionButton={false} title="Notification Details" buttonName="Open" fullwidth={false} actionButton={true}>
                    <Card >
                        <CardActionArea disabled>
                            <CardHeader>
                                Details
                            </CardHeader>
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        </Card>
                    </GlobalDialog> */}
                    </div>
                  </Grid>
              </Grid>
    </List>
  );
}
