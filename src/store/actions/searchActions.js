import algoliasearch from "algoliasearch";
import { configs } from "../../config/configs";
import { openLoader,closeLoader } from "./snackBarAction";
import _ from "lodash";

const ALGOLIA_APP_ID = configs.algolia.app_id;
const ALGOLIA_SEARCH_ONLY_KEY = configs.algolia.search_only_key;
const algolia = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_SEARCH_ONLY_KEY);

export const searchingTrue = () => {
  return (dispatch, getState) => {
    dispatch({ type: "SEARCHING_TRUE" });
  };
};

export const searchingFalse = () => {
  return (dispatch, getState) => {
    dispatch({ type: "SEARCHING_FALSE" });
  };
};

const changeHitsID = (hits) => {
  var i;
  for (i = 0; i < hits.length; i++) {
    hits[i].id = hits[i].objectID;
    delete hits[i].objectID;
  }
  return hits;
};

export const search = (query) => (dispatch, getState) => {
  dispatch({ type: "SEARCHING_TRUE" });
  let index = algolia.initIndex("products");
  try {
    index
      .search(query, {
        hitsPerPage: 50,
      })
      .then((content) => {
        return dispatch({
          type: "SEARCHING_FALSE",
          hits: changeHitsID(content.hits),
        });
      })
      .catch((err) => dispatch({ type: "SEARCHING_FALSE", err: err }));
  } catch (err) {
    dispatch({ type: "SEARCHING_FALSE", err: err });
    console.log(err);
  }
};

export const updateStore = (productList) => {
  return (dispatch, getState) => {
    dispatch(openLoader());
    dispatch({type: "UPDATE_STORE",payload: productList});
    dispatch(closeLoader());
  }
}
export const filterSearch = (productData,selectedSearch) => {
  return (dispatch, getState) => {
    dispatch(openLoader());
    if(selectedSearch){
      const product = [];
      selectedSearch.map((filter,index)=>{
        // if(filter.type){
        //   return filter.type === "alphabet" ? sortByAlphabet(productData,filter.key) : sortByPrice(productData,filter.key)
        // }
        const newProductLists = productData.filter(product => product.category === filter.value)
        product.push(...newProductLists)
      })
      dispatch({ type: "FILTER_RESULT", payload: [...product] });
        dispatch(closeLoader());
    }else{
      dispatch({ type: "FILTER_RESULT", payload: productData });
      dispatch(closeLoader());
    }
    dispatch(closeLoader())
};
}

export const addSelectedValues = (data) => {
  return (dispatch, getState) => {
    dispatch({ type: "ADDED_SELECTED_VALUE", payload: data });
  };
}
export const deleteSelectedValues = (data) => {
  return (dispatch, getState) => {
    dispatch({ type: "DELETED_SELECTED_VALUE", payload: data });
  };
}

export const sortByPrice = (arr,type) => {
  return (dispatch, getState) => {
    if(type === "Price - Lowest to Highest"){
        const ascData = _.orderBy(arr, ['discountPrice'], ['asc'])
         dispatch({ type: "LOW_TO_HIGH_PRICE", payload: ascData });
    }else if(type === "Price - Highest to Lowest"){
        const descData = _.orderBy(arr, ['discountPrice'], ['desc'])
         dispatch({ type: "HIGH_TO_LOW_PRICE", payload: descData });
    }else{
      return
    }
  };
}

export const sortByAlphabet = (arr,type) => {
  return (dispatch, getState) => {
    if(type === "Name - A-Z"){
        const ascData = _.orderBy(arr, ['title'], ['asc'])
         dispatch({ type: "SORT_BY_A_Z", payload: ascData });
    }else if(type === "Name - Z-A"){
        const descData = _.orderBy(arr, ['title'], ['desc'])
         dispatch({ type: "SORT_BY_Z_A", payload: descData });
    }else{
      return
    }
  };
}

export const sortAsc = (arr, field) => {
  console.log(_.sortBy(arr,[field]))
  if(!arr && !field){
    return
  }
  return _.sortBy(arr,[field]);
}

export const sortDesc = (arr, field) => {
  if(!arr && !field){
    return
  }
  return _.sortBy(arr,[field]);
}

function addFilterIfNotExists(filter, appliedFilters) {
  let index = appliedFilters.indexOf(filter);
  if (index === -1) appliedFilters.push(filter);

  return appliedFilters;
}

function removeFilter(filter, appliedFilters) {
  let index = appliedFilters.indexOf(filter);
  appliedFilters.splice(index, 1);
  return appliedFilters;
}

const formatCategory = (array,category) => {
  return (dispatch, getState) => {
    const state = getState();
    console.log(category)
    console.log(state.firestore.ordered.categories);
    const result = array.filter(function(array) {
      return array
    });
    console.log(result);
    return result;
  }
}