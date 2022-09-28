import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Hidden } from "@material-ui/core";
import ProductGrid from "../product/ProductGrid";

import { useHistory } from 'react-router-dom';
import { connect } from "react-redux";
import { loadFavProducts } from "../../../store/actions/favAction";
import CartBox from "../cart/CartBox";
import ScrollToTop from "../../common/ScrollToTop";
import Layout from "../Layout/Layout";
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#eaeded",
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(1),
    paddingTop: theme.spacing(1),
    minHeight: "100vh",
    [theme.breakpoints.down("xs")]: {
      padding: 0,
    },
  },
  main: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  banner: {
    height: "auto",
    marginBottom: theme.spacing(1),
    borderRadius: theme.shape.borderRadius,
    width: "100%",
    minWidth: 0,
  },
  description: {
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(1),
    fontSize: 18,
    fontWeight: 300,
    backgroundColor: "#ffffff",
    borderRadius: theme.shape.borderRadius,
    width: "100%",
    marginBottom: theme.spacing(1),
    fontStyle: "italic",
    boxSizing: "border-box",
  },
}));

function FavouritesList(props) {
  const classes = useStyles();
  const history = useHistory(); 
  const {products} = props;
  

  useEffect(() => {
    if(props.profile.isLoaded){
        props.loadFavProducts();
    }
  },[props.profile]);

  return (
    <Layout title={"A-Tech > Browse available favourites Products"} content={"Find out your fav products with the heavy deals available"} >
      <div className={classes.root}>
        <ScrollToTop />
        <Grid container spacing={2}>
          <Hidden smDown>
            <Grid item md={2}>
              <CartBox />
            </Grid>
          </Hidden>
          <Grid item xs={12} md={10} container>
            <div className={classes.main}>
              {products && (
                <ProductGrid
                  data={products}
                  page={1}
                  count={products.length}
                  nextPage={() => {}}
                />
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return {
    products: state.favourite.favProducts,
    profile: state.firebase.profile,
    auth: state.firebase.auth.uid,
  };
};

const matchDispatchToProps = (dispatch) => {
  return {
    loadFavProducts: () => dispatch(loadFavProducts()),
  };
};

export default connect(mapStateToProps, matchDispatchToProps)(FavouritesList);
