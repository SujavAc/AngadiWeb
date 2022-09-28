import { openLoader, closeLoader, openSnackBar } from "./snackBarAction";
import { isEmpty,includes,pull } from 'lodash';
import { useSelector } from 'react-redux'

  
  export const addToFav = (productId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
      const state = getState();
      const firestore = getFirestore();
      const favId = [productId];
      dispatch(openLoader());
      if(!state.firebase.auth.uid || !productId){
        const snackbarPayload = {
          variant: "info",
          message:
            "Please Sign in to add on you favourite list",
          disableSubmit: false,
        };
        dispatch(openSnackBar(snackbarPayload));
        dispatch(closeLoader())
      }else{
          firestore
            .collection("users")
            .doc(state.firebase.auth.uid)
            .get()
            .then((d) => {
              var doc = d.data();
              var fav = doc.fav;
              const favList = favId;
              
              if(isEmpty(fav)){
                firestore
                  .collection("users")
                  .doc(state.firebase.auth.uid)
                  .update({fav: favList})
                  .then(()=>{
                    dispatch(closeLoader());
                    const snackbarPayload = {
                      variant: "success",
                      message:
                        "Added to favourite list",
                      disableSubmit: false,
                    };
                    dispatch(openSnackBar(snackbarPayload));
                  })
                  .catch((err)=>{
                    dispatch(closeLoader());
                    const snackbarPayload = {
                      variant: "error",
                      message:
                        "Something Went wrong",
                      disableSubmit: false,
                    };
                    dispatch(openSnackBar(snackbarPayload));
                  })
                dispatch(closeLoader());
                    const snackbarPayload = {
                      variant: "info",
                      message:
                        "Fav is empty",
                      disableSubmit: false,
                    };
                    dispatch(openSnackBar(snackbarPayload));
              }else{
              if(includes(fav,productId)){
                const newFav = pull(fav,productId);
                firestore
                  .collection("users")
                  .doc(state.firebase.auth.uid)
                  .update({fav: newFav})
                  .then(()=>{
                    dispatch(closeLoader());
                    const snackbarPayload = {
                      variant: "success",
                      message:
                        "Removed from favourite list",
                      disableSubmit: false,
                    };
                    dispatch(openSnackBar(snackbarPayload));
                  })
                  .catch((err)=>{
                    dispatch(closeLoader());
                    const snackbarPayload = {
                      variant: "error",
                      message:
                        "Something Went wrong",
                      disableSubmit: false,
                    };
                    dispatch(openSnackBar(snackbarPayload));
                  })
                
              }else{
                const newList = [...fav,productId]
                firestore
                  .collection("users")
                  .doc(state.firebase.auth.uid)
                  .update({fav: newList})
                  .then(()=>{
                    dispatch(closeLoader());
                    const snackbarPayload = {
                      variant: "success",
                      message:
                        "Added to favourite list",
                      disableSubmit: false,
                    };
                    dispatch(openSnackBar(snackbarPayload));
                  })
                  .catch((err)=>{
                    dispatch(closeLoader());
                    const snackbarPayload = {
                      variant: "error",
                      message:
                        "Something Went wrong",
                      disableSubmit: false,
                    };
                    dispatch(openSnackBar(snackbarPayload));
                  })
              }
              }
            })
            .catch((err) => {
            dispatch(closeLoader());
            const snackbarPayload = {
              variant: "error",
              message:
                "Something Went wrong",
              disableSubmit: false,
            };
            dispatch(openSnackBar(snackbarPayload));
          });
      }
    };
  };
  
  export const loadFavProducts = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
      const firestore = getFirestore();
      var state = getState();
      dispatch(openLoader());
      // if(!state.firebase.auth.uid){
      //   const snackbarPayload = {
      //     variant: "info",
      //     message:
      //       "Please Sign in before viewing your favourites products",
      //     disableSubmit: false,
      //   };
      //   dispatch(openSnackBar(snackbarPayload));
      //   dispatch({ type: "LOAD_FAV_PRODUCTS_ERROR" });
      //   dispatch(closeLoader());
      // }
      if (state.firebase.profile.isLoaded && state.firebase.profile.fav.length === 0) {
        const snackbarPayload = {
          variant: "info",
          message:
            "Products will appears after you added to the favourites list ",
          disableSubmit: false,
        };
        dispatch(openSnackBar(snackbarPayload));
        dispatch({ type: "LOAD_FAV_PRODUCTS_ERROR" });
        dispatch(closeLoader());
      }else{
        const favProductData = [];
        firestore
        .collection("users")
        .doc(state.firebase.auth.uid)
        .get()
        .then((doc)=>{
          const favList = doc.data().fav;
        favList.forEach(element => {
          firestore
          .collection("products")
          .doc(element)
          .get()
          .then((doc)=>{
              favProductData.push({id: doc.id, ...doc.data()});
          })
          .then(()=>{
            dispatch({ type: "LOAD_FAV_PRODUCTS", favProductData });
            dispatch(closeLoader());
          })
          .catch(()=>{
            dispatch(closeLoader());
            const snackbarPayload = {
              variant: "error",
              message:
                "Something Went wrong",
              disableSubmit: false,
            };
            dispatch({ type: "LOAD_FAV_PRODUCTS_ERROR" });
            dispatch(openSnackBar(snackbarPayload));
            dispatch(closeLoader());
          })
        });
        
        })
      }
    };
  };