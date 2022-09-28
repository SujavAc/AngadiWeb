import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import ContactUsForm from "../Form/contactUsForm";
import Layout from "../Layout/Layout";

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
  },
  title: {
    fontSize: 30,
    marginBottom: theme.spacing(1),
    fontWeight: 700,
  },
  content: {
      padding: theme.spacing(2),
  }
}));

function ContactUs() {
  const classes = useStyles();
  return (
    <Layout title={"A-Tech > Contact Us"} content={"A-Tech Contact Us Form"}>
      <div className={classes.root}>
        <Grid container justify="center">
          <Grid item xs={11} sm={8}>
            <div className={classes.base}>
            <div className={classes.content}>
              <div className={classes.title}>Contact us</div>
                <ContactUsForm />
               </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
}

export default ContactUs;
