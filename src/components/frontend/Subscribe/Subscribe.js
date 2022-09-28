import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import Snackbar from "../../common/Snackbar/Snackbar";
import Progress from '../../common/Progress/Progress';
// import Progress from "../Progress/Progress";
import firebase from "firebase";
import { requestMemberSubscribe, requestMemberValidateEmail  } from "../../../store/actions/generalAction";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { makeStyles } from "@material-ui/core/styles";
import { openLoader, closeLoader} from '../../../store/actions/snackBarAction';
import { filter } from "lodash";

const useStyles = makeStyles((theme) => ({
  subscribeWrapper: {
    padding:'16px', 
    display:'flex',
    flexDirection:'column',
    alignItems:'left', 
    justifyContent:'center',
    [theme.breakpoints.up("sm")]: {
      alignItems:'center', 
    },
  },
}));

function SubscribeUS(props) {
  const classes = useStyles();
  const { text, title } = props;
  const [data, setData] = React.useState({ fname: "", lname: "", email: "" });
  
  const [cod, setCod] = React.useState("");
  const [userinputcod, setUserinputcode] = React.useState();
  const [sbs, setSbs] = React.useState([]);
  //progress
  const [ploading, setPLoading] = React.useState(false);
  //snackbar
  const [snackbar, setSnackbar] = React.useState(false);
  const [smsg, setSMsg] = React.useState({ success: "", error: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(false);
  };
  function getRandomString(length) {
    var randomChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var result = "";
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
    }

    return result;
  }
  const Validation = (e) => {
    e.preventDefault();
    setPLoading(true);
    if (!userinputcod) {
      setPLoading(false);
      setSnackbar(true);
      setSMsg({ error: "Provide Unique Code to Validate" });
    } else {
      if (cod === userinputcod) {
        const userData = {
          Email: data.email,
          FirstName: data.fname,
          LastName: data.lname,
          Status: "Active"
        };
        props.requestMemberSubscribe(userData);
        setData({
                fname: "",
                lname: "",
                email: "",
              });
              setUserinputcode("");
      } else {
        setPLoading(false);
        setSnackbar(true);
        setSMsg({ error: "Unique Code Doesn't Match" });
      }
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    setPLoading(true);
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!data.fname || !data.email || !data.lname) {
      setPLoading(false);
      setSnackbar(true);
      setSMsg({ error: "Required all fields" });
    }
     else {
       
      if (data.email && data.email.match(emailRegex)) {
          const UCode = getRandomString(6);
          setCod(UCode);
          const userData = {
            code: UCode,
            Email: data.email,
            FirstName: data.fname,
            LastName: data.lname,
          };
          props.requestMemberValidateEmail(userData);
      } else {
        setPLoading(false);
        setSnackbar(true);
        setSMsg({ error: "Provid valid email to get unique Code" });
      }
    }
  };

  function SubscriberUser(){
    return(
      <Grid container spacing={3} xs={12} sm={6} md={6} lg={6} >
         <Grid item xs={12} sm={6} md={6} xl={6}>
           You are already subscribed with us.
         </Grid>
      </Grid>
    )
  }

  useEffect(()=>{
    if(!props.subscribedUser && !props.profile){
        props.openLoader();
    }else{
        props.closeLoader();
    }
},[props.subscribedUser,props.profile])

  return (
    <div>
        
        <div className={classes.subscribeWrapper}>
        <div style={{paddingBottom:'16px'}}>{title}</div>
          <DialogContentText>{text}</DialogContentText>
          {filter(props.subscribedUser,{'Email': props.profile.email}).length ? (
            <SubscriberUser />
          ):(
            <Grid container spacing={3} xs={12} sm={6} md={6} lg={6} >
            <Grid item xs={12} sm={6} md={6} xl={6}>
              <TextField
                margin="dense"
                id="name"
                name="fname"
                label="First Name"
                type="name"
                fullWidth
                value={data.fname}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} xl={6}>
              <TextField
                margin="dense"
                id="lname"
                name="lname"
                label="Last Name"
                type="lname"
                fullWidth
                value={data.lname}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} xl={12}>
              <TextField
                margin="dense"
                id="email"
                name="email"
                label="Email Address"
                type="email"
                fullWidth
                value={data.email}
                onChange={handleChange}
              />
            </Grid>
            {props.subscribeState === "VERIFICATION_EMAIL_SENT" && (
                <Grid item xs={12} sm={12} md={12} xl={12}>
                  <TextField
                    margin="dense"
                    id="code"
                    name="Code"
                    label="Insert your Code Here"
                    type="code"
                    fullWidth
                    value={userinputcod}
                    onChange={(e) => {
                      setUserinputcode(e.target.value);
                    }}
                  />
                </Grid>
            )}
            <Grid item xs={12} sm={12} md={12} xl={12} justify="flex-end">
            <DialogActions>
          <Progress
            variant="outlined"
            color="primary"
            buttonName={props.subscribeState === "VERIFICATION_EMAIL_SENT" ? "Validate" : "Subscribe"}
            onClick={props.subscribeState === "VERIFICATION_EMAIL_SENT" ? Validation : handleSubscribe}
            ploading={props.subscribeState === "VERIFICATION_EMAIL_SENT" ? false : (props.subscribeState === "MEMBER_ADDED_AFTER_VERIFICATION" ? false : ploading)}
          />
        </DialogActions>
        </Grid>
          </Grid>
          )}
          
        </div>
        
        {smsg.error ? (
          <Snackbar
            open={snackbar}
            handleClose={handleCloseSnackbar}
            message={smsg.error}
            type={"error"}
          />
        ) : (
          <Snackbar
            open={snackbar}
            handleClose={handleCloseSnackbar}
            message={smsg.success}
            type={"success"}
          />
        )}
    </div>
  );
}

SubscribeUS.prototype = {
  title: PropTypes.string,
  text: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    subscribeState: state.general.state,
    subscribedUser: state.firestore.ordered.Subscriber,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestMemberSubscribe: (data) => dispatch(requestMemberSubscribe(data)),
    requestMemberValidateEmail: (data) => dispatch(requestMemberValidateEmail(data)),
    openLoader: () => dispatch(openLoader()),
    closeLoader: () => dispatch(closeLoader()),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: "Subscriber",
      },
    ];
  })
)(SubscribeUS);