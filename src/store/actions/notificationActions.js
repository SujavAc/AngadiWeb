import { openSnackBar } from "./snackBarAction";

export const deleteNotification = (id) => {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
      const firestore = getFirestore();
      firestore
        .collection("notifications")
        .doc(id)
        .delete()
        .then(() => {
          dispatch({ type: "DELETE_NOTIFICATION", id });
          const payload = {
            variant: "success",
            message: "Successfully Deleted",
            disableSubmit: false,
          };
          dispatch(openSnackBar(payload));
        })
        .catch((err) => {
          dispatch({ type: "DELETE_NOTIFICATION_ERR", err });
          const payload = {
            variant: "error",
            message: "error while deleting notification",
            disableSubmit: false,
          };
          dispatch(openSnackBar(payload));
        });
    };
  };

  export const readNotification = (id) => {
    return (dispatch, getState, { getFirestore, getFirebase }) => {
      const firestore = getFirestore();
      firestore
        .collection("notifications")
        .doc(id)
        .update({read: true})
        .then(() => {
          dispatch({ type: "READ_NOTIFICATION", id });
        })
        .catch((err) => {
          console.log(err);
          dispatch({ type: "READ_NOTIFICATION_ERR", err });
        });
    };
  };
  