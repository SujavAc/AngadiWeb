const initstate = {
  status: "",
  message: "",
  state: "",
  categoryProducts: []
};

const generalReducer = (state = initstate, action) => {
  switch (action.type) {
    case "SENT_ENQUIRY":
      return Object.assign({}, state, {
        status: "SUCCESS",
        message: "Enquiry sent",
      });
    case "SENT_ENQUIRY_ERR":
      return Object.assign({}, state, {
        status: "ERROR",
        message: "Failed to send enquiry",
      });
    case "SENT_FAQ":
      return Object.assign({}, state, {
        status: "SUCCESS",
        message: "FAQ sent",
      });
    case "SENT_FAQ_ERR":
      return Object.assign({}, state, {
        status: "ERROR",
        message: "Failed to send FAQ",
      });
    case "EMAIL_VERIFIED":
      return Object.assign({}, state, {
        status: "SUCCESS",
        message: "Email verified",
      });
    case "EMAIL_VERIFIED_FAILED":
      return Object.assign({}, state, {
        status: "ERROR",
        message: "Email verified Failed",
      });
    case "MEMBER_ADDED_REJECT":
      return Object.assign({}, state, {
        status: "ERROR",
        message: "Email already register",
        state: "MEMBER_ADDED_REJECT",
      });
    case "VERIFICATION_EMAIL_SENT":
      return Object.assign({}, state, {
        status: "SUCCESS",
        message: "Email sent for with verification code",
        state: "VERIFICATION_EMAIL_SENT",
      });
    case "MEMBER_ADDED_ERROR":
      return Object.assign({}, state, {
        status: "ERROR",
        message: "Error verifying user",
        state: "MEMBER_ADDED_ERROR",
      });
    case "MEMBER_ADDED_AFTER_VERIFICATION":
      return Object.assign({}, state, {
        status: "SUCCESS",
        message: "Verified user added",
        state: "MEMBER_ADDED_AFTER_VERIFICATION",
      });
    case "PRODUCT_OBTINED":
      return Object.assign({}, state, {
        status: "SUCCESS",
        message: "product dipatched",
        state: "PRODUCT_OBTINED",
        categoryProducts: action.products
      });
    case "SNACKBAR_CLOSE":
      return Object.assign({}, state, {
        status: "FAILED",
        message: "Error while sending",
      });
    default:
      return state;
  }
};

export default generalReducer;
