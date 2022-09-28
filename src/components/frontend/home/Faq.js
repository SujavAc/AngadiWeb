import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Layout from "../Layout/Layout";
import FaqList from "../FaqList";
import FaqForm from "../Form/FaqForm";

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

function FAQ() {
  const classes = useStyles();
  return (
    <Layout title={"A-Tech > FAQ"} content={"A-Tech's Frequently Asked Questions"}>
      <div className={classes.root}>
        <Grid container justify="center">
          <Grid item xs={11} sm={8}>
            <div className={classes.base}>
              <div className={classes.title}>FAQ's</div>
              <FaqList />
              <div className={classes.title}>Shoot us any question you may have</div>
              <FaqForm />
            </div>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
}

export default FAQ;
