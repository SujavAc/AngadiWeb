import * as React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Box, Fab } from '@material-ui/core';
import { AddIcCallOutlined, EditLocationOutlined, Favorite, Navigation} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    Box:{
        '& > :not(style)': { m: 2 } ,
        position: 'fixed',
        bottom: 10,
        left: 10,
    },
    Fav: {
        mr: 1
    }
  }));

export default function FavBox() {
    const classes = useStyles();

  return (
    <Box className={classes.Box}>
      <Fab color="primary" aria-label="add">
        <AddIcCallOutlined />
      </Fab>
      <Fab color="secondary" aria-label="edit">
        <EditLocationOutlined />
      </Fab>
      <Fab variant="extended">
        <Navigation className={classes.Nav} />
        Navigate
      </Fab>
      <Fab aria-label="like" className={classes.Fav}>
        <Favorite />
      </Fab>
    </Box>
  );
}
