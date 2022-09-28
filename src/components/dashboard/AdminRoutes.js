import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Orders from "./orders";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import Locations from "./locations";
import ProductManagament from "./products/Managment";
import AddProduct from "./products/AddProduct";
import AddCategory from "./products/AddCategory";
import ComboManagement from "./products/ComboManagement";
import AppBar from "./sekeleton/AppBar";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Admintheme from "./AdminTheme";
import Banners from "./banners";
import { connect } from "react-redux";
import { withRouter, useHistory } from "react-router-dom";
import { closeSnackBar } from "../../store/actions/snackBarAction";
import Faq from './common/Pages/FaqList/index';
import AddAboutUs from "./common/Pages/AboutUs/AboutUs";
import TC from "./common/Pages/T&C/T&C";
import UpdateProductDescription from "./ProductDescription/UpdateProductDescription";

const useStyles = makeStyles((theme) => ({
  divAlign: {
    marginTop: "100px",
    marginLeft: "240px",
    paddingBottom: 20,
    backgroundColor: "#E4E4E4",
    minHeight: "calc(100vh - 100px)",
    padding: "0px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "50px",
      marginLeft: "0px",
      minHeight: "calc(100vh - 50px)",
    },
  },
}));

function AdminRoutes(props) {
  const [authenticate, setAuth] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (props.profile.isLoaded) {
      if (props.auth.uid && props.profile.isAdmin) {
        setAuth(true);
      } else {
        history.push("/");
      }
    }
  }, [props.profile, props.auth]);

  if (!authenticate) return <div> Please wait while Authenticating.... </div>;

  return (
    <div>
      <MuiThemeProvider theme={Admintheme}>
        <AppBar Pprops={props} />
        <div className={classes.divAlign}>
        <Switch>
          <Route exact path="/dashboard" component={Orders} />
          {/* <Route exact path="/dashboard/locations" component={Locations} /> */}
          <Route
            exact
            path="/dashboard/faqlist"
            component={Faq}
          />
          <Route
            exact
            path="/dashboard/products/updatedescription"
            component={UpdateProductDescription}
          />
          <Route
            exact
            path="/dashboard/aboutus"
            component={AddAboutUs}
          />
          <Route
            exact
            path="/dashboard/termsandcondition"
            component={TC}
          />
          <Route
            exact
            path="/dashboard/products/management"
            component={ProductManagament}
          />
          <Route
            exact
            path="/dashboard/products/addproduct"
            component={AddProduct}
          />
          <Route
            exact
            path="/dashboard/products/addproduct/:productId"
            component={AddProduct}
          />
          <Route
            exact
            path="/dashboard/products/addcategory"
            component={AddCategory}
          />
          <Route
            exact
            path="/dashboard/products/combo"
            component={ComboManagement}
          />
          <Route exact path="/dashboard/banners" component={Banners} />
        </Switch>
        
        </div>
        <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              open={props.sanckbarStatus?.snackbarStatus}
              autoHideDuration={6000}
              onClose={props.closeSnackBar}
              key={"topright"}
            >
              <Alert onClose={props.closeSnackBar} severity={props.sanckbarStatus?.variant}>
                {props.sanckbarStatus?.message}
              </Alert>
            </Snackbar>
      </MuiThemeProvider>
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    profile: state.firebase.profile,
    auth: state.firebase.auth,
    sanckbarStatus: state.snackbar,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // openLoader: () => dispatch(openLoader()),
    // closeLoader: () => dispatch(closeLoader()),
    closeSnackBar: () => dispatch(closeSnackBar()),
  };
};

export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(AdminRoutes));
