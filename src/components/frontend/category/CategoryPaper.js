import React, { useState } from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
  wrapper:{
    padding: theme.spacing(1),
  },
  paperRoots: {
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
    alignItems: 'center',
    alignContent: 'center',
    color: "#000000",
    fontWeight: 400,
    height: 250,
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      height: 250,
      
    },
  },
  paperImgs: {
    height: "150px",
    width: "230px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  paperTitle: {
    width: '100%',
    display: "inline-block",
    fontWeight: 700,
    textDecorationStyle: 'none',
    position: 'relative',
    bottom: -50,
    alignItems: 'center',
    [theme.breakpoints.down("md")]: {
      fontSize: "1rem",
    },
    overflow: "hidden",
    color: "#000000",
  },
}));

// TODO: Truckate large category names

function CategoryPaper({ title, url, categoryId }) {
  const [imgLoaded, setLoaded] = useState(false);
  const classes = useStyles();
  return (
    <Link to={"/category/" + categoryId}>
      <Paper elevation={5} className={classes.wrapper}>
      <div className={classes.paperRoots}>
        {!imgLoaded && (
          <Skeleton animation="wave" variant="rect" width="100%" height={250} />
        )}
        <div className={classes.paperImgs}>
          <img
            src={url}
            alt={title}
            width="100%"
            height= "100%"
            onLoad={() => setLoaded(true)}
          />
        </div>
        <span className={classes.paperTitle}>{title}</span>
      </div>
      </Paper>
    </Link>
  );
}

export default CategoryPaper;
