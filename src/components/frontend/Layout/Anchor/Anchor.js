import * as React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from "@material-ui/core/styles";
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import Zoom from '@material-ui/core/Zoom';

//redux
import { connect } from 'react-redux';
// import { logoutUser, getUserData } from '../../store/actions/user';
// import { selectUserData } from '../../store/selectors/user';

const useStyles = makeStyles((theme) => ({
  arrow: {
    position: 'fixed',
    bottom: 10,
    right: 10,
    zIndex: 0
  },
}));

function ScrollTop(props) {
  const classes = useStyles();
  const { children, window, id } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector(
      id,
    );

    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <Zoom in={trigger}>
      {/* {user ? (
        <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 65, right: 16 }}
      >
        {children}
      </Box>
      ):(
        <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
      )} */}
      <div
        onClick={handleClick}
        role="presentation"
        className={classes.arrow}
      >
        {children}
      </div>
    </Zoom>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  id: PropTypes.string,
  user: PropTypes.object,
  window: PropTypes.func,
};

function BackToTop({props,children,id}) {
  return (
    <React.Fragment >
      
          {children}
        
      <ScrollTop {...props} id={id} >
        <Fab variant="round" color="primary" size="medium" aria-label="scroll back to top">
          <ArrowUpwardIcon />
        </Fab>
      </ScrollTop>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    // user: state.firebase.auth,
  };
};


export default connect(mapStateToProps, null)(BackToTop);
