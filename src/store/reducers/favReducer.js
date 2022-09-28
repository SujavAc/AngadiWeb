const initstate = {
    favProducts: [],
  };

  const favReducer = (state = initstate, action) => {
    switch (action.type) {
        case "LOAD_FAV_PRODUCTS":
            var newState = state;
            newState.favProducts = action.favProductData;
            return newState;
        case "LOAD_FAV_PRODUCTS_ERROR":
            return Object.assign({}, state, {
                favProducts: [],
            });
        default:
            return state;
    }
  };
  
  export default favReducer;
  