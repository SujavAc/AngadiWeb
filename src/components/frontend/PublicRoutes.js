import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";
import Home from "./home/Home";
import PublicTheme from "./PublicTheme";
import AllCategories from "./category/AllCategories";
import Cart from "./cart/Cart";
import ProductDetails from "./product/ProductDetails";
import Review from "../frontend/cart/Review";
import Payment from "../frontend/cart/Payment";
import CategoryProducts from "../frontend/category/CategoryProducts";
import SearchProduct from "../frontend/product/SearchProduct";
import PageNotFound from "./NotFound";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";
import Account from "./auth/Account";
import SpecialProducts from "./product/SpecialProducts";
import TC from "./home/TC";
import AboutUs from "./home/AboutUs";
import Shipping from "./home/Shipping";
import RC from "./home/RC";
import Layout from "./Layout/Layout";
import AppBar from "./appbar/AppBar";
import LoaderComponent from '../common/Backdrop/Backdrop';
import Footer from "./home/Footer";
import BackToTop from './Layout/Anchor/Anchor';
import ContactUs from "./home/contactUs";
import { closeSnackBar, openLoader } from "../../store/actions/snackBarAction";
import FAQ from "./home/Faq";
import FavouritesList from './home/Favourites';
import Notification from "./Notifications/Notification";

class PublicRoutes extends Component {
  render() {
    if(!this.props.profile.isLoaded){
      openLoader();
    }
    return (
      <MuiThemeProvider theme={PublicTheme}>
        <div id="main">
        <BackToTop id="#main">
          <LoaderComponent />
            <AppBar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/categories" component={AllCategories} />
              <Route exact path="/deals" component={SpecialProducts} />
              <Route exact path="/fav" component={FavouritesList} />
              <Route exact path="/notifications" component={Notification} />
              <Route exact path="/checkout/cart" component={Cart} />
              <Route exact path="/contactus" component={ContactUs} />
              <Route exact path="/faqs" component={FAQ} />
              <Route exact path="/checkout/review" component={Review} />
              <Route exact path="/checkout/payment" component={Payment} />
              <Route exact path="/product/:productId" component={ProductDetails} />
              <Route
                exact
                path="/category/:categoryId"
                component={CategoryProducts}
              />
              <Route exact path="/search/:searchParam" component={SearchProduct} />
              <Route exact path="/signin" component={SignIn} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/account" component={Account} />
              <Route exact path="/terms-and-conditions" component={TC} />
              <Route exact path="/shipping-policy" component={Shipping} />
              <Route exact path="/refunds" component={RC} />
              <Route exact path="/aboutus" component={AboutUs} />
              <Route path="/404" component={PageNotFound} />
              <Redirect to="/404" />
            </Switch>
            <Footer />
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              open={this.props.sanckbarStatus?.snackbarStatus}
              autoHideDuration={6000}
              onClose={this.props.closeSnackBar}
              key={"topright"}
            >
              <Alert onClose={this.props.closeSnackBar} severity={this.props.sanckbarStatus?.variant}>
                {this.props.sanckbarStatus?.message}
              </Alert>
            </Snackbar>
        </BackToTop>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sanckbarStatus: state.snackbar,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeSnackBar: () => dispatch(closeSnackBar()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PublicRoutes);
