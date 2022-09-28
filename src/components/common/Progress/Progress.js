import React from 'react';
import clsx from 'clsx';
import propTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import Buttons from '../Button/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonSuccess: {
    
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function Progress(props) {
  const classes = useStyles();
  //const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();
  const time = timer.current;
  const {buttonName,onClick,ploading, variant, color} = props;

  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });

  React.useEffect(() => {
    return () => {
      clearTimeout(time);
    };
  },[time]);

  

  return (
    <div className={classes.root}>
      <div className={classes.wrapper}>
      
        <Buttons color={color} variant={variant} buttonName={buttonName} className={buttonClassname} disabled={ploading} onClick={onClick}/>
        {ploading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </div>
    </div>
  );
}
Progress.propTypes = {
    buttonName: propTypes.string,
    onClick:propTypes.func,
    ploading:propTypes.bool,
}