import React from 'react';
import propType from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    
    '& > *': {
      margin: theme.spacing(1),
      
    },
    
  },
}));

export default function Buttons(props) {
  const classes = useStyles();
  const {buttonName,className,onClick,disabled,hrefLink,variant,color} = props;
 
  
  return (
    // <div className={classes.root}>
      // <Stack 
      // direction="row"
      // justifyContent="center"
      // alignItems="center"
      // spacing={2}
      // >
      <Button 
      variant={variant}
      onClick={onClick}
      color={color}
      href={hrefLink}
      disabled={disabled}
      className={classes.button}
     
      >
          {buttonName} 
    </Button>
    // </Stack>
    // </div>
  );
}
Buttons.propType = {
    buttonName:propType.string,
    variant:propType.string,
    hrefLink:propType.string,
    className:propType.func,
    disabled:propType.bool,
    onClick:propType.func,
    color: propType.string,
}
