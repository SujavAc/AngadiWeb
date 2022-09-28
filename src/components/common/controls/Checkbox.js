import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    formControl: {
      margin: theme.spacing(3),
    },
  }),
);

export default function Checkboxes(props) {
    const { name, label, checked, error = null, onChange, options } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={onChange} name={name} />}
            label={label}
          />
          
        {error && <FormHelperText>{error}</FormHelperText>}
    </div>
  );
}
