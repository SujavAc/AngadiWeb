export const openSnackBar = (payload) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({type:"SNACKBAR_OPEN",payload});
    }
}

export const closeSnackBar = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({type:"SNACKBAR_CLOSE"});
    }
}

export const openLoader = (payload) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({type:"LOADER_OPEN",payload});
    }
}

export const closeLoader = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        dispatch({type:"LOADER_CLOSE"});
    }
}