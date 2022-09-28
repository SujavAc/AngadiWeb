import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Hidden } from "@material-ui/core";
import { configs } from "../../../config/configs";
import Layout from "../Layout/Layout";
import Editor from "rich-markdown-editor";
import CartBox from "../cart/CartBox";

import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

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
    minHeight: "50vh",
    color: "000000",
  },
  title: {
    fontSize: 30,
    marginBottom: theme.spacing(1),
    fontWeight: 700,
    textAlign: "center",
  },
  center: {
    textAlign: "center",
    fontWeight: 900,
  },
  address: {
    textAlign: "center",
    marginTop: 10,
  },
  image: {
    width: "100%",
    marginBottom: 40,
  },
  bugs: {
    padding: 8,
  }
}));

function AboutUs(props) {
  const classes = useStyles();
  const aboutUs = props.AboutUsData ? props.AboutUsData[0] : "";
 
  return (
    <Layout title={"A-Tech > About Us"} content={"Who are we"}>
      <div className={classes.root}>
        <Grid container justify="center">
          <Grid item xs={11} sm={8}>
          {/* <Hidden smDown>
            <Grid item md={2}>
              <CartBox />
            </Grid>
          </Hidden> */}
            <div className={classes.base}>
              <div className={classes.title}>About Us</div>
              <br />
              
              <Grid container justify="center">
                <Grid container item xs={11} sm={11} md={9} lg={6} justify="center">
                  {/* <Grid item xs={12}>
                    <img className={classes.image} src="/imgs/logo.png" />
                  </Grid> */}
                  <Grid className={classes.center} item xs={12}>
                    {configs.aboutus}
                  </Grid>
                  <Grid className={classes.address} item xs={12}>
                    {"Office Address: " + configs.address}
                  </Grid>
                  <Grid className={classes.body} item xs={12}>
                  <Editor 
                        defaultValue={aboutUs?.content}
                        className="editor-description"
                        readOnly
                        value={aboutUs?.content}
                        
                        style={{
                          fontFamily: "'Merriweather', serif",
                          fontSize: "20px",
                          letterSpacing: "0.05em",
                        }}
                      />
                  </Grid>
                </Grid>
              </Grid>
              <br />
              <br />
              <hr />
              <br />
              <Grid container >
                <Grid item xs={11} sm={4} className={classes.bugs}>
                  If you encounter any bugs, glitches, lack of functionality,
                  delayed deliveries, billing errors or other problems, Kindly
                  email us on{" "}
                  <a
                    href={"mailto:" + configs.contactInfo.email}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {configs.contactInfo.email}
                  </a>
                  <br />
                  <br />
                  WhatsApp us :{" "}
                  <a
                    href={
                      "https://wa.me/" +
                      configs.contactInfo.watsappNum +
                      "?text=Needed support"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {configs.contactInfo.watsappNum}
                  </a>
                </Grid>
                {/* <Grid item sm="auto" xs={12}>
                  <div className={classes.services}>Download App</div>
                  <br />
                  <a
                    href={configs.contactInfo.androidAppLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.downloadImg}
                  >
                    <img
                      src="/imgs/play_store.png"
                      alt="Download app from playstore"
                    />
                  </a>{" "}
                  <a
                    href={configs.contactInfo.iosAppLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/imgs/ios_store.png"
                      alt="Download app from appstore"
                    />
                  </a>
                </Grid> */}
              </Grid>
              <br />
              {/* {configs.usingAlgoliaFree && (
                <div>
                  Search powered <br /> by <b>Algolia</b>
                </div>
              )} */}
            </div>
          </Grid>
        </Grid>
      </div>
    </Layout>
  );
}

const mapStateToProps = (state) => {
  return {
    AboutUsData: state.firestore.ordered['About Us'],
  };
};


export default compose(
  connect(mapStateToProps, null),
  firestoreConnect((props) => {
    return [
      {
        collection: "About Us",
        doc: "UH5PQHkZ9HzetcZkIx2U",
      },
    ];
  })
)(AboutUs);
