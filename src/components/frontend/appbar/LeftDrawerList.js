import React, { useState, useEffect}  from "react";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Transition from "../../common/Elements/Transition/Transition";
import { withRouter, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { auth } from "firebase";
import { Badge } from "@material-ui/core";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { readNotification } from "../../../store/actions/notificationActions";
import {concat, filter, orderBy, isEmpty, union} from 'lodash';
import { openLoader, closeLoader } from "../../../store/actions/snackBarAction";

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(1),
  },
}));

const itemList1 = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Shop by Category",
    link: "../categories",
  },
  {
    name: "All Offers",
    link: "../deals",
  },
];

const itemList2 = [
  {
    name: "My Account",
    link: "../account",
  },
  {
    name: "About us",
    link: "../aboutus",
  },
];

function LeftDrawerList(props) {
  const classes = useStyles();
  const history = useHistory();
  const [authenticate, setAuth] = useState(false);
  const [notifications,setNotifications] = useState(0);
  
  useEffect(() => {
    if (props.profile.isLoaded) {
      if (props.auth.uid && props.profile.isAdmin) {
        setAuth(true);
      }
      if(props.auth.uid){
        const totalNotification = props.notification.length + props.notificationsByEmail.length;
      const totalReadNotification = props.readNotifications.length + props.readNotificationByEmail.length;

      const badgeContent = totalNotification - totalReadNotification;
      
      setNotifications(badgeContent);
      }
      
    }
  }, [props.profile, props.auth, props.notification, props.readNotifications, props.notificationsByEmail, props.readNotificationByEmail, notifications,authenticate]);

  return (
    <List>
      {itemList1.map(({ name, link }, idx) => {
        return (
          <Transition
            key={idx}
            transitionType="slide"
            active={true}
            direction="left"
            timeout={2000}
          >
            <ListItem
              component={Link}
              to={link}
              key={idx}
              button
              onClick={props.onClick}
            >
              <ListItemText className={classes.itemRoot} primary={name} />
            </ListItem>
          </Transition>
        );
      })}
      <Divider className={classes.divider} />
      {itemList2.map(({ name, link }, idx) => {
        return (
          <Transition
            key={idx}
            transitionType="slide"
            active={true}
            direction="left"
            timeout={2000}
          >
            <ListItem
              component={Link}
              to={link}
              key={idx}
              button
              disabled={
                name === "My Account" ? (!props.auth.uid ? true : false) : false
              }
              onClick={props.onClick}
            >
              <ListItemText className={classes.itemRoot} primary={name} />
            </ListItem>
          </Transition>
        );
      })}
      <Divider className={classes.divider} />
      {authenticate  && props.profile.isAdmin && (
        <ListItem
          component={Link}
          to="../dashboard"
          button
          disabled={
            authenticate ? false : true
          }
        >
          <ListItemText className={classes.itemRoot} primary={"Dashboard"} />
        </ListItem>
      )}
      
        <ListItem
          component={Link}
          to="../notifications"
          button
          disabled={
            props.auth.uid ? false : true
          }
        >
          <Badge
        badgeContent={notifications}
        color="primary"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
          <ListItemText className={classes.itemRoot} primary={"Notification"} />
          </Badge>
        </ListItem>
       
    </List>
  );
}

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
    auth: state.firebase.auth,
    notification: state.firestore.ordered.notifications,
    readNotifications: state.firestore.ordered.readNotification,
    notificationsByEmail: state.firestore.ordered.notificationsByEmail,
    readNotificationByEmail: state.firestore.ordered.readNotificationByEmail,
  };
};

export default compose(connect(mapStateToProps, null),
firestoreConnect((props) => {
  if(props.auth.email && props.auth.uid){
  return [
    {
      collection: "notifications",
      where:[["user_id", "==", props.auth.uid]],
      orderBy:[['date',"desc"]]
    },
    {
      collection: "notifications",
      where:[["email", "==", props.auth.email]],
      orderBy:[['date',"desc"]],
      storeAs: "notificationsByEmail"
    },
    {
      collection: "notifications",
      where:[["email", "==", props.auth.email],["read", "==", true]],
      orderBy:[['date',"desc"]],
      storeAs: "readNotificationByEmail"
    },
    {
      collection: "notifications",
      where:[["user_id", "==", props.auth.uid],["read", "==", true]],
      orderBy:[['date',"desc"]],
      storeAs: "readNotification"
    },
  ];
}
return []
})
)(LeftDrawerList);
