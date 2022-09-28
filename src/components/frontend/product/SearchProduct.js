import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Hidden } from "@material-ui/core";
import ProductGrid from "./ProductGrid";
import { concat, filter, orderBy, isEmpty, union } from "lodash";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

import {
  updateStore,
  search,
  addSelectedValues,
  deleteSelectedValues,
  sortByPrice,
  sortByAlphabet,
  filterSearch
} from "../../../store/actions/searchActions";
import CartBox from "../cart/CartBox";
import { configs } from "../../../config/configs";
import ScrollToTop from "../../common/ScrollToTop";
import Layout from "../Layout/Layout";
import SearchFilter from "../Search/SearchFilter";
import CategoryFilter from "../Search/CategoryFilter";

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
  searchHead: {
    boxSizing: "border-box",
    padding: theme.spacing(2),
    paddingLeft: 0,
    fontSize: 16,
    fontWeight: 400,
  },
  searchTitle: {
    fontSize: 20,
    fontWeight: 600,
  },
  algolia: {
    fontSize: 14,
    [theme.breakpoints.down("xs")]: {
      fontSize: 12,
    },
  },
}));

function SearchProduct(props) {
  const classes = useStyles();
  const search = props.match.params.searchParam;
  const [finalFilteredResult, setFinalFilteredResult] = useState([]);

  useEffect(() => {
    var textToSearch = props.match.params.searchParam;
      var filteredArrayDescription =
      props.products &&
      props.products.filter((item) => {
        return (
          item?.description
            .toString()
            .toLowerCase()
            .indexOf(textToSearch.toLowerCase()) > -1
        );
      });
    var filteredArray =
      props.products &&
      props.products.filter((item) => {
        return (
          item?.title
            .toString()
            .toLowerCase()
            .indexOf(textToSearch.toLowerCase()) > -1
        );
      });
    var filteredArrayMaterial =
      props.products &&
      props.products.filter((item) => {
        return (
          item?.material
            .toString()
            .toLowerCase()
            .indexOf(textToSearch.toLowerCase()) > -1
        );
      });
    const newFilteredArray = union(
      filteredArrayDescription,
      filteredArray,
      filteredArrayMaterial
    );
    if(props.results && props.length > 0){
      return setFinalFilteredResult(props.results);
    }else{
      return setFinalFilteredResult(newFilteredArray);
    }
    
    
  }, [props.match.params.searchParam,props.products,props.results]);

  useEffect(()=>{
    props.filterSearch(props.products, props.search);
    if(props.search){
      props.search.map((filter,index)=>{
        if(filter.type === "alphabet"){
          props.sortByAlphabet(props.products,filter.key);
        }
        if(filter.type === "price"){
          props.sortByPrice(props.products,filter.key);
        }
      })
    }
  },[props.search,props.products])

  useEffect(()=>{
    props.products && props.updateStore(props.products);
  },[props.products])

  if (props.searching) {
    return <div>loading results.......</div>;
  }

  if (!props.searching && props.err) {
    return <div>Error while loading results</div>;
  }

  return (
    <Layout
      title={"A-Tech > Search"}
      content={"Find the products quicky using different filters."}
    >
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
              <Grid container justify="space-between">
                <Grid item>
                  <span className={classes.searchHead}>
                    Showing all results for{" "}
                    <span className={classes.searchTitle}>{search}</span>
                  </span>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} lg={12} xl={12}>
                <SearchFilter />
                <Grid item xs={12} sm={12} lg={12} xl={12}>
                  <CategoryFilter
                    category={props.categories}
                    addSelectedValues={props.addSelectedValues}
                    deleteSelectedValues={props.deleteSelectedValues}
                    searchSelectedValue={props.search}
                    sortByPrice={props.sortByPrice}
                  />
                </Grid>
              </Grid>
              {props.search && props.search.length ?

              props.results && props.results.length > 0 && (
                <ProductGrid
                  data={props.results}
                  page={1}
                  count={props.results.length}
                  nextPage={() => {}}
                />
              )
               : 
               finalFilteredResult && finalFilteredResult.length > 0 && (
                <ProductGrid
                  data={finalFilteredResult}
                  page={1}
                  count={finalFilteredResult.length}
                  nextPage={() => {}}
                />
              )
              }

              {/* {props.results && (
                <ProductGrid
                  data={props.results}
                  page={1}
                  count={props.results.length}
                  nextPage={() => {}}
                />
              )} */}
            </div>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return {
    categories: state.firestore.ordered.categories,
    results: state.search.results,
    err: state.search.err,
    searching: state.search.searching,
    products: state.firestore.ordered.products,
    search: state.search.searchFilterValues,
  };
};

const matchDispatchToProps = (dispatch) => {
  return {
    updateStore: (pList) => dispatch(updateStore(pList)),
    addSelectedValues: (data) => dispatch(addSelectedValues(data)),
    deleteSelectedValues: (data) => dispatch(deleteSelectedValues(data)),
    sortByPrice: (data,type) => dispatch(sortByPrice(data,type)),
    sortByAlphabet: (data,type) => dispatch(sortByAlphabet(data,type)),
    filterSearch: (productData,selectedSearch) => dispatch(filterSearch(productData,selectedSearch))
  };
};

export default compose(
  connect(mapStateToProps, matchDispatchToProps),
  firestoreConnect([{ collection: "products" }, { collection: "categories" }])
)(SearchProduct);
