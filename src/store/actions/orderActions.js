import { clearCart } from "./cartActions";
import { configs } from "../../config/configs";

const calcTPrice = (items) => {
  if (!items && items.length === 0) return 0;
  var res = 0;
  items.forEach((item) => {
    res += item.quantity * item.discountPrice;
  });
  return res;
};

const serializeItems = (items) => {
  var cart = [];

  items.forEach((item) => {
    cart.push(
      item.title +
        ";" +
        item.quantity +
        ";" +
        item.discountPrice +
        ";" +
        item.unit +
        ";" +
        item.id
    );
  });
  return cart.join("|");
};

export const createOrder = (tokenData) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
      const state = getState();
      const firestore = getFirestore();
      const firebase = getFirebase();
      console.log(tokenData);
    var amount = calcTPrice(state.cart.items);
     var cartData = serializeItems(state.cart.items);
     if (state.firebase.auth.uid) {
      try {
        const orderData = {
          amount: amount,
          order_data: cartData,
          user_id: state.firebase.auth.uid,
          user_name: state.firebase.profile.name,
          delivery: state.firebase.profile.delivery,
          pnum: state.firebase.profile.pNum,
          token: tokenData.token,
          completed: false,
          deliverd: false,
          cancelled: false,
          createdAt: Date.now(),
        };
        firestore
        .collection("orders")
        .add(orderData)
        .then(() => {
          dispatch({ type: "CREATE_ORDER", orderData });
          dispatch({type: "WAITING_FOR_VERIFY"});
        })
        .then(()=>{
          firestore.collection("orders").where("user_id", "==", state.firebase.auth.uid).orderBy("createdAt" , "desc").get().then((docs)=>{
            docs.forEach(doc => {
              const token = doc.data().token;
              if(JSON.stringify(token.id) === JSON.stringify(orderData.token.id)){
                dispatch({
                  type: "TRANS_VERIFIED"
                });
                dispatch({
                  type: "AFTER_ORDER_VERIFIED"
                });
                dispatch(clearCart());
              }
            })
          })
        })
        .catch((err) => {
          console.log(err);
          dispatch({ type: "CREATE_ORDER_ERR", err });
        });

      }catch{
        dispatch({ type: "CREATE_ORDER_ERR"});
      }
     }
      
    };
  };

  export const verifyOrder = (
    tokenData,userId
  ) => async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const firebase = getFirebase();
    const state = getState();
    if (state.firebase.auth.uid) {
      
      try {
        console.log('verifying order started');
          firestore.collection("orders").where("user_id", "==", userId).orderBy("createdAt" , "desc").get().then((docs)=>{
            docs.forEach(doc => {
              const token = doc.data().token;

              if(JSON.stringify(token.token.id) === JSON.stringify(tokenData.token.id)){
                dispatch({
                  type: "TRANS_VERIFIED"
                });
                dispatch({
                  type: "AFTER_ORDER_VERIFIED"
                });
                dispatch(clearCart());
              }
          })
          })
          .catch((err)=>{
            console.log(err);
            dispatch({
              type: "TRANS_NOT_VERIFIED",
              err: err,
            });
          })
    
    } catch (err) {
      dispatch({
        type: "TRANS_NOT_VERIFIED",
        err: err,
      });
    }
  }
  };

  export const dispatchEmail = () => {
      return (dispatch, getState, { getFirebase, getFirestore }) => {
          console.log("emailsent");
          dispatch({type:"EMAIL_SENT"});
      }
  }

  export const dispatchEmailErr = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({type:"EMAIL_SENT_ERR"});
    }
}

export const handleSnackbarClose = () => {
    return (dispatch, getState) => {
      dispatch({ type: "CLOSE_SNACKBAR_PRODUCT" });
    };
  };