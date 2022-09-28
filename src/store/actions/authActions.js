import { clearCart, syncCart, loadCartItems } from "./cartActions";
import { openLoader, closeLoader } from "./snackBarAction";
import { googleAuthProvider } from "../../config/firebaseConfig";
import firebase from "firebase";

export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    dispatch(openLoader());
    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
        dispatch(clearCart());
        dispatch(loadCartItems());
        dispatch(closeLoader());
      })
      .catch((err) => {
        dispatch({ type: "LOGIN_ERR", err });
        dispatch(closeLoader());
      });
  };
};

export const signInWithGoogle = () => {
  return (dispatch, getState, { getFirebase }) => {
    dispatch(openLoader());
    firebase
    .auth()
    .signInWithPopup(googleAuthProvider)
      .then((result) => {
        const user = result.user;
        const userData = {
          cart: "",
          delivery: "",
          email: user.email,
          fav: [],
          isAdmin: false,
          isGuest: true,
          name: user.displayName,
          profileUrl: user.photoURL,
          pNum: user.phoneNumber ? user.phoneNumber : ""
        }
        dispatch(checkExistingUserAndUpdateInfo(user.uid,userData));
        dispatch({ type: "LOGIN_SUCCESS" });
        dispatch(clearCart());
        dispatch(loadCartItems());
        dispatch(closeLoader());
      })
      .catch((err) => {
        dispatch({ type: "LOGIN_ERR", err });
        dispatch(closeLoader());
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    dispatch(openLoader());
    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
        dispatch(clearCart());
        dispatch(closeLoader());
      });
  };
};

export const signUp = (user) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const email = user.email;
    const password = user.password;
    dispatch(openLoader());
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((resp) => {
        return firestore.collection("users").doc(resp.user.uid).set({
          name: user.username,
          delivery: user.main,
          email: user.email,
          pNum: user.phoneNum,
          isAdmin: false,
          isGuest: true,
          cart: "",
          fav: []
        });
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" });
        dispatch(syncCart());
        dispatch(closeLoader());
      })
      .catch((err) => {
        dispatch({ type: "SGINUP_ERR", err });
        dispatch(closeLoader());
      });
  };
};

export const anonymousSignup = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    dispatch(openLoader());
    firebase
      .auth()
      .signInAnonymously()
      .then((resp) => {
        return firestore.collection("users").doc(resp.user.uid).set({
          name: "GUEST",
          delivery: "",
          pincode: "None",
          pNum: "",
          isAdmin: false,
          isGuest: true,
          cart: "",
        });
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" });
        dispatch(syncCart());
        dispatch(closeLoader());
      })
      .catch((err) => {
      dispatch({ type: "SGINUP_ERR", err });
      dispatch(closeLoader());
      });
  };
};

export const checkExistingUserAndUpdateInfo = (userID,userData) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    dispatch(openLoader());
    firestore
      .collection("users")
      .doc(userID)
      .get()
      .then((doc)=>{
        if(doc.data()){
          return
        }else{
          dispatch(updateNewUserInfo(userData))
        }
      })
      .then(() => {dispatch({ type: "USER_UPDATE_SUCCESS" });dispatch(closeLoader());})
      .catch((err) => {dispatch({ type: "USER_UPDATE_FAILURE", err });dispatch(closeLoader());});
  };
};

export const updateUserProfile = (userId, imageData) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    dispatch(openLoader());
    var storageRef = firebase
      .storage()
      .ref()
      .child("userProfile/" + userId);
    storageRef
      .putString(imageData, "data_url")
      .then((snapshot) => {
        return snapshot.ref.getDownloadURL();
      })
      .then((downloadURL) => {
        return firestore
          .collection("users")
          .doc(userId)
          .update({ profileUrl: downloadURL });
      })
      .then(() => {
        dispatch({ type: "USER_PROFILE_SUCCESS" });
        dispatch(closeLoader());
      })
      .catch((err) => {
        dispatch({ type: "USER_PROFILE_FAILURE", err });
        dispatch(closeLoader());
      });
  };
};

// export const updateUserProfile = (userID, userName, url) => {
//   return (dispatch, getState, { getFirebase, getFirestore }) => {
//     const firestore = getFirestore();
//     dispatch(openLoader());
//     firestore
//       .collection("users")
//       .doc(userID)
//       .update({
//         profileUrl: url
//       })
//       .then(() => {dispatch({ type: "USER_PROFILE_SUCCESS" });dispatch(closeLoader());})
//       .catch((err) => {dispatch({ type: "USER_PROFILE_FAILURE", err });dispatch(closeLoader());});
//   };
// };

export const updateUserInfo = (userID, userInfo) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    dispatch(openLoader());
    firestore
      .collection("users")
      .doc(userID)
      .update({
        name: userInfo.name,
        delivery: userInfo.main,
        email: userInfo.email,
        pNum: userInfo.phoneNum,
      })
      .then(() => {dispatch({ type: "USER_UPDATE_SUCCESS" });dispatch(closeLoader());})
      .catch((err) => {dispatch({ type: "USER_UPDATE_FAILURE", err });dispatch(closeLoader());});
  };
};

export const updateNewUserInfo = (userInfo) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    dispatch(openLoader());
    firestore
      .collection("users")
      .add(userInfo)
      .then(() => {dispatch({ type: "USER_UPDATE_SUCCESS" });dispatch(closeLoader());})
      .catch((err) => {dispatch({ type: "USER_UPDATE_FAILURE", err });dispatch(closeLoader());});
  };
};

export const resetAuthErr = () => {
  return (dispatch, getState) => {
    dispatch({ type: "RESET_AUTH_ERR" });
  };
};
