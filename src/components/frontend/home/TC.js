import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import TCD from "../TCD";
import Layout from "../Layout/Layout";
import ScrollToTop from "../../common/ScrollToTop";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#eaeded",
    paddingBottom: theme.spacing(2),
    minHeight: "100vh",
  },
  base: {
    width: "100%",
    marginTop: theme.spacing(1),
    backgroundColor: "#FFFFFF",
    minHeight: "100vh",
    color: "000000",
    // padding: theme.spacing(2),
  },
  title: {
    fontSize: 30,
    marginBottom: theme.spacing(1),
    fontWeight: 700,
    padding: theme.spacing(2),
  },
}));

function TC() {
  const classes = useStyles();
  return (
    <Layout title={"A-Tech > Terms and Condition"} content={"A-Tech's terms and condition"}>
      <div className={classes.root}>
        <Grid container justify="center">
          <Grid item xs={11} sm={8}>
            <div className={classes.base}>
              <ScrollToTop />
              <div className={classes.title}>Terms and Conditions</div>
              <TCD />
            </div>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
}

export default TC;
