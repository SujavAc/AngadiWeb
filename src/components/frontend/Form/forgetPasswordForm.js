import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Form from "../../common/Form";
import useForm from "../../common/useForm";
import Controls from "../../common/controls/Controls";

import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { requestForRestPassword } from "../../../store/actions/generalAction";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#FFFFFF",
    padding: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
}));

const initialFValues = {
  email: "",
};

function ForgetPasswordForm(props) {
  const classes = useStyles();

  const validate = (fieldValues = values) => {
    let tmp = { ...errors };
    let emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    
    if ("email" in fieldValues)
      tmp.email =
        fieldValues.email
          ? (fieldValues.email.match(emailRegex)
          ? ""
          : "update email format")
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
    return (
      profile.email === values.email
    );
  };

  const resetValues = () => {
    setValues({
      email: props.profile.email ? props.profile.email : ""
    });
  };

  useEffect(() => {
    setValues({
      email: props.profile.email ? props.profile.email : "",
    });
  }, [props.profile]);

  const handleSubmitPasswordReset = (e) => {
    e.preventDefault();
    if (validate()) {
      props.requestForRestPassword(values);
      resetValues();
    }
  };

  return (
    <div className={classes.root}>
      <Form onSubmit={handleSubmitPasswordReset}>
        <Grid container>
          <Grid item xs={12}>
            <Controls.Input
              name="email"
              label="Email"
              value={values.email}
              onChange={handleInputChange}
              error={errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <Controls.Button
              disabled={checkChange(props.profile, values)}
              onClick={resetValues}
              type="reset"
              text="Reset Form"
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
    requestForRestPassword: (data) => dispatch(requestForRestPassword(data)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "locations" }])
)(ForgetPasswordForm);
