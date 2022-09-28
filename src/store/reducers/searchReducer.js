import _ from 'lodash';

const initstate = {
  results: [],
  searching: false,
  err: "",
  searchFilterValues: []
};

const searchReducer = (state = initstate, action) => {
  switch (action.type) {
    case "SEARCHING_TRUE":
      return {
        ...state,
        searching: true,
        results: [],
      };
      case "UPDATE_STORE":
      return {
        ...state,
        results: [...action.payload]
      };
      case "ADDED_SELECTED_VALUE":
      return {
        ...state,
        searchFilterValues: [...state.searchFilterValues, action.payload]
      };
      case "DELETED_SELECTED_VALUE":
      return {
        ...state,
        searchFilterValues: [...action.payload]
      };
      case "FILTER_RESULT":
      return {
        ...state,
        results: [...action.payload]
      };
      case "SORT_BY_A_Z":
        return{
          ...state,
          results: [...action.payload]
        }
        case "SORT_BY_Z_A":
          return{
            ...state,
            results: [...action.payload]
          } 
          case "LOW_TO_HIGH_PRICE":
        return{
          ...state,
          results: [...action.payload]
        }
        case "HIGH_TO_LOW_PRICE":
          return{
            ...state,
            results: [...action.payload]
          }  
    case "SEARCHING_FALSE":
      if (action.err) {
        return {
          ...state,
          searching: false,
          err: action.err,
          results: [],
        };
      } else {
        return {
          ...state,
          searching: false,
          err: "",
          results: action.hits,
        };
      }

    default:
      return state;
  }
};

export default searchReducer;
