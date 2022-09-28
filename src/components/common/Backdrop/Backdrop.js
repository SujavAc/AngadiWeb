import * as React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Backdrop, CircularProgress } from '@material-ui/core';
import { connect } from "react-redux";
import { closeLoader } from '../../../store/actions/snackBarAction';

const useStyles = makeStyles((theme) => ({
    Backdrop: {
        color: theme.palette.primary.main, 
        zIndex: 1 
    },
  }));

function LoaderComponent({loading, closeLoader, message}) {
  const classes = useStyles();

  return (
    <div>
      <Backdrop
        className={classes.Backdrop}
        open={loading}
        onClick={closeLoader}
      >
        <CircularProgress color="inherit" />
        {message}
      </Backdrop>
    </div>
  );
}

const mapStateToProps = (state) => {
    return {
      loading: state.snackbar.loading,
      message: state.snackbar.message,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      closeLoader: () => dispatch(closeLoader()),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(LoaderComponent);