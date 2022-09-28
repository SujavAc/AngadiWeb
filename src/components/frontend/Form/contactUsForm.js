import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Form from "../../common/Form";
import useForm from "../../common/useForm";
import Controls from "../../common/controls/Controls";

import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { sendContactData } from "../../../store/actions/generalAction";
import Hidden from "@material-ui/core/Hidden";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#FFFFFF",
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}));

const initialFValues = {
  name: "",
  email: "",
  message: "",
};

function ContactUsForm(props) {
  const classes = useStyles();

  const validate = (fieldValues = values) => {
    let tmp = { ...errors };
    if ("message" in fieldValues)
      tmp.message = fieldValues.message ? "" : "Message is required.";
    if ("name" in fieldValues)
      tmp.name =
        fieldValues.name && fieldValues.name !== "GUEST"
          ? ""
          : "Please provide your name";
    if ("email" in fieldValues)
      tmp.email =
        fieldValues.email
          ? ""
          : "Please provide your email";
    setErrors({
      ...tmp,
    });
    if (fieldValues === values)
      return Object.values(tmp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange } = useForm(
    initialFValues,
    true,
    validate
  );

  const checkChange = (profile, values) => {
    // var pincodes = getPincodes();
    // if (pincodes.length < 1) return false;
    return (
      profile.name === values.name &&
      profile.email === values.email &&
      // profile.pincode === pincodes[values.pincode].title &&
      profile.message === values.message
    );
  };

  const resetValues = () => {
    setValues({
      name: props.profile.name ? props.profile.name : "",
      message: props.profile.message ? props.profile.message : "",
      email: props.profile.email ? props.profile.email : ""
    });
  };

  useEffect(() => {
    setValues({
      name: props.profile.name ? props.profile.name : "",
      message: props.profile.message ? props.profile.message : "",
      email: props.profile.email ? props.profile.email : "",
    });
  }, [props.profile]);

  // const getPincodeIndex = (pincode) => {
  //   if (props.locations) {
  //     var locations = props.locations[0].locations.split(",");
  //     var idx = locations.findIndex((e) => e === pincode);
  //     return idx + 1;
  //   } else return 0;
  // };

  // const getPincodes = () => {
  //   if (props.locations) {
  //     var locations = props.locations[0].locations.split(",");
  //     var res = [{ id: 0, title: "None" }];
  //     locations.forEach((location, idx) => {
  //       res.push({ id: idx + 1, title: location });
  //     });
  //     return res;
  //   } else {
  //     return picodeSelect;
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      props.sendContactData(values);
      resetValues();
      // var locations = props.locations[0].locations.split(",");
      // var pincode = locations[values.pincode - 1];
      // props.updateUserInfo(props.auth.uid, {
      //   ...values,
      //   // pincode: pincode,
      // });
    }
  };

  return (
    <div className={classes.root}>
      <Form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Hidden smDown>
              <Controls.Input
                name="name"
                label="Name"
                value={values.name}
                onChange={handleInputChange}
                error={errors.name}
                autoFocus
              />
            </Hidden>
            <Hidden mdUp>
              <Controls.Input
                name="name"
                label="Name"
                value={values.name}
                onChange={handleInputChange}
                error={errors.name}
              />
            </Hidden>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controls.Input
              name="email"
              label="Email"
              value={values.email}
              onChange={handleInputChange}
              error={errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <Controls.InputArea
              name="message"
              label="Your Message"
              value={values.message}
              onChange={handleInputChange}
              error={errors.message}
              rowsMax={5}
            />
          </Grid>
          <Grid item xs={12}>
            <Controls.Button
              disabled={checkChange(props.profile, values)}
              onClick={resetValues}
              type="reset"
              text="Reset"
            />
            <Controls.Button
              disabled={checkChange(props.profile, values)}
              type="submit"
              variant="outlined"
              text="Submit"
            />
          </Grid>
        </Grid>
      </Form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendContactData: (data) => dispatch(sendContactData(data)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "locations" }])
)(ContactUsForm);
