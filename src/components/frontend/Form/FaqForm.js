import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Form from "../../common/Form";
import useForm from "../../common/useForm";
import Controls from "../../common/controls/Controls";

import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { sendFaqData } from "../../../store/actions/generalAction";
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
  question: "",
};

function FaqForm(props) {
  const classes = useStyles();

  const validate = (fieldValues = values) => {
    let tmp = { ...errors };
    if ("question" in fieldValues)
      tmp.question = fieldValues.question ? "" : "Question is required.";
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
    return (
      profile.name === values.name &&
      profile.email === values.email &&
      profile.question === values.question
    );
  };

  const resetValues = () => {
    setValues({
      name: props.profile.name ? props.profile.name : "",
      question: props.profile.question ? props.profile.question : "",
      email: props.profile.email ? props.profile.email : ""
    });
  };

  useEffect(() => {
    setValues({
      name: props.profile.name ? props.profile.name : "",
      question: props.profile.question ? props.profile.question : "",
      email: props.profile.email ? props.profile.email : "",
    });
  }, [props.profile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      props.sendFaqData(values);
      resetValues();
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
              name="question"
              label="Your Question here..."
              value={values.question}
              onChange={handleInputChange}
              error={errors.question}
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
    sendFaqData: (data) => dispatch(sendFaqData(data)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "locations" }])
)(FaqForm);
