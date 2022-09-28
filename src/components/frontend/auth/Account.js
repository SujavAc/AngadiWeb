import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Button } from "@material-ui/core";
import CartAddress from "../cart/CartAddress";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { signOut,updateUserProfile } from "../../../store/actions/authActions";
import { cancelOrder, deleteOrder } from "../../../store/actions/paymentActions";

import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

import OrderCard from "./OrderCard";
import Layout from "../Layout/Layout";
import UploadImageButton from "../../common/UploadImageButton";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#eaeded",
    paddingTop: theme.spacing(3),
    minHeight: "100vh",
  },
  userImg: {
    width: "100%",
    height: 250,
    borderRadius: 20,
  },
  logoutBtn: {
    textAlign: "center",
    marginTop: 10,
  },
  ordersRoot: {
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    backgroundColor: "#FFFFFF",
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(2),
  },
}));

function Account(props) {
  const classes = useStyles();
  let history = useHistory();

  const handleUpdateImage = (filesObj, update, userId) => {
    if (filesObj.length > 0 && update) {
      props.updateUserProfile(userId, filesObj[0].data);
    }
  };

  const handleLogout = () => {
    props.signOut();
    history.push("/");
  };

  if (!props.auth.uid) return <Redirect to="/" />;

  return (
    <Layout title={"A-Tech > User Account"} content={"Account info page where user can manage their information"}>
      <div className={classes.root}>
        <Grid container justify="center">
          <Grid item xs={"auto"} >
            <img className={classes.userImg} src={props.profile.profileUrl ? props.profile.profileUrl : "/imgs/user.png"} />
          </Grid>
          <Grid xs={12} item container justify="center">
            <Grid item xs={"auto"}>
            <UploadImageButton 
            text={"Update Image"}
            rounded={false}
            filesLimit={1}
            callbackSave={(filesObj, update) =>
              handleUpdateImage(filesObj, update, props.auth.uid)
            }
            />
            </Grid>
          </Grid>
          <Grid xs={12} item container justify="center">
            <Grid item xs={"auto"}>
              <Button
                onClick={handleLogout}
                variant="outlined"
                className={classes.logoutBtn}
              >
                Log Out
              </Button>
            </Grid>
          </Grid>
          <Grid xs={12} item container justify="center">
            <Grid item xs={10} lg={6}>
              <CartAddress profile={props.profile} open={false} />
            </Grid>
            <Grid id="orders" item xs={10} lg={8}>
              <div className={classes.ordersRoot}>
                <h2>Orders</h2>
                {props.orders &&
                  props.orders.map((order, idx) => (
                    <OrderCard
                      key={idx}
                      cancelOrder={(id) => props.cancelOrder(id)}
                      deleteOrder={(id) => props.deleteOrder(id)}
                      order={order}
                    />
                  ))}
                {props.orders && props.orders.length === 0 && (
                  <p>No Previous Orders</p>
                )}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
}

const mapDispatchtoProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
    cancelOrder: (id) => dispatch(cancelOrder(id)),
    deleteOrder: (id) => dispatch(deleteOrder(id)),
    updateUserProfile: (userId, ImageData) => dispatch(updateUserProfile(userId, ImageData))
  };
};

const mapStatetoProps = (state) => {
  return {
    profile: state.firebase.profile,
    auth: state.firebase.auth,
    orders: state.firestore.ordered.orders,
  };
};

export default compose(
  connect(mapStatetoProps, mapDispatchtoProps),
  firestoreConnect((props) => {
    return [
      {
        collection: "orders",
        where: [
          ["user_id", "==", props.auth.uid],
          ["completed", "==", false],
        ],
        orderBy: ["createdAt", "desc"],
      },
    ];
  })
)(Account);
