import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router";
import { Grid } from "@material-ui/core";
import TCD from "../TCD";
import Layout from "../Layout/Layout";
import ScrollToTop from "../../common/ScrollToTop";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { openLoader, closeLoader } from "../../../store/actions/snackBarAction";
import NotificationList from "./NotificationList";
import { deleteNotification, readNotification } from "../../../store/actions/notificationActions";
import CommonPagination from "../../common/Pagination/CommonPagination";
import {concat, filter, orderBy, isEmpty, union} from 'lodash';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#eaeded",
    paddingBottom: theme.spacing(2),
    minHeight: "100vh",
  },
  base: {
    width: "100%",
    marginTop: theme.spacing(1),
    backgroundColor: "#FFFFFF",
    minHeight: "100vh",
    color: "000000",
    // padding: theme.spacing(2),
  },
  title: {
    fontSize: 30,
    marginBottom: theme.spacing(1),
    fontWeight: 700,
    padding: theme.spacing(2),
  },
  list: {
      padding: theme.spacing(2),
      borderRadius: 100,
  },
}));

function Notifications(props) {
  const classes = useStyles();

  useEffect(()=>{
      if(!props.notifications){
          props.openLoader();
      }else{
          props.closeLoader();
      }
  },[props.notifications])

  if (!props.auth.uid) return <Redirect to="/" />;

  return (
    <Layout title={"A-Tech > Notifications"} content={"A-Tech's Notifications"}>
      <div className={classes.root}>
        <Grid container justify="center">
          <Grid item xs={11} sm={8}>
            <div className={classes.base}>
              <ScrollToTop />
              <div className={classes.title}>Notifications</div>
              <div >

                {/* {props.notifications && props.notifications.map((value,index)=>{ */}
                    {props.notifications && (
                     <div className={classes.list}>
                        <CommonPagination 
                        data={union(props.notifications,props.notificationsByEmail)}
                        page={1}
                        count={union(props.notifications,props.notificationsByEmail).length}
                        nextPage={() => {}}
                        JSX = {(value)=> {return <NotificationList notification={value} deleteNotification={props.deleteNotification} readNotification={props.readNotification}/>}}
                        >
                        {/* <NotificationList deleteNotification={props.deleteNotification} readNotification={props.readNotification}/> */}
                        </CommonPagination>
                        </div>
                    )}

                {/* })} */}
              </div>
              <TCD />
            </div>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
}

const mapStatetoProps = (state) => {
    return {
      notifications: state.firestore.ordered.notifications,
      notificationsByEmail: state.firestore.ordered.notificationsByEmail,
      auth: state.firebase.auth,
    };
  };
  const matchDispatchToProps = (dispatch) => {
      return {
          openLoader: () => dispatch(openLoader()),
          closeLoader: () => dispatch(closeLoader()),
          deleteNotification: (id) => dispatch(deleteNotification(id)),
          readNotification: (id) => dispatch(readNotification(id)),
      }
  }
  export default compose(
    connect(mapStatetoProps, matchDispatchToProps),
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
      ];
    }
    return []
    })
  )(Notifications);
