const initstate = {
    snackbarStatus: false,
    message: "",
    variant: "success",
    disableSubmit: false,
    specials: [],
    order_id: "",
    msg: "",
  };

 const orderReducer = (state = initstate, action) => {
    switch (action.type) {
      case "CREATE_ORDER":
        return Object.assign({}, state, {
          snackbarStatus: true,
          message: "Order created successfully",
          variant: "success",
          disableSubmit: false,
        });
        case "WAITING_FOR_VERIFY":
        return Object.assign({}, state, {
          snackbarStatus: true,
          message: "Waiting for verification of your order",
          variant: "success",
          disableSubmit: false,
        });
        case "AFTER_ORDER_VERIFIED":
        return Object.assign({}, state, {
          snackbarStatus: true,
          message: "Congratulations, your order have been verified, you will get an email shortly. Thank you.",
          variant: "success",
          disableSubmit: false,
        });
        case "CREATE_ORDER_ERR":
            return Object.assign({}, state, {
              snackbarStatus: true,
              message: "Error while creatind order, Please try again",
              variant: "error",
              disableSubmit: false,
            });
        case "EMAIL_SENT":
        return Object.assign({}, state, {
            snackbarStatus: true,
            message: "Email have been sent to you about your order.",
            variant: "success",
            disableSubmit: false,
        });
        case "EMAIL_SENT_ERR":
        return Object.assign({}, state, {
            snackbarStatus: true,
            message: "Something wrong while sending email to you, Try again!!!",
            variant: "error",
            disableSubmit: false,
        });
        case "CLOSE_SNACKBAR_PRODUCT":
      return Object.assign({}, state, {
        ...state,
        snackbarStatus: false,
      });
      case "TRANS_VERIFIED":
      return {
        ...state,
        order_id: "",
        status: false,
        msg: "SUCCESS",
      };
    case "TRANS_NOT_VERIFIED":
      return {
        ...state,
        msg: "TRANS_NOT_VERFIED",
        order_id: "",
        status: false,
      };
        default:
      return state;
  }
};

export default orderReducer;
