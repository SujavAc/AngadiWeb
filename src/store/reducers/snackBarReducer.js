const initstate = {
    snackbarStatus: false,
    message: "",
    variant: "",
    disableSubmit: false,
    loading: false,
  };

  const snackbarReducer = (state = initstate, action) => {
    switch (action.type) {
      case "SNACKBAR_OPEN":
        return Object.assign({}, state, {
          snackbarStatus: true,
          message: action.payload.message,
          variant: action.payload.variant,
          disableSubmit: action.payload.disableSubmit,
        });
        case "SNACKBAR_CLOSE":
            return Object.assign({}, state, {
              snackbarStatus: false,
              message: "",
              variant: "",
              disableSubmit: false,
            });
        case "LOADER_OPEN":
        return Object.assign({}, state, {
          loading: true
        });
        case "LOADER_CLOSE":
        return Object.assign({}, state, {
          loading: false
        });
      default:
        return state;
    }
  };
  
  export default snackbarReducer;
  