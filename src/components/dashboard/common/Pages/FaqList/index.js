import React, { useState, useEffect } from "react";
import PageHeader from "../../../common/PageHeader";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import FaqTable from "./FaqTable";
import FaqDetails from "./FaqDetails";
import { LiveHelp } from "@material-ui/icons";
import { handleDeleteFaq, handleUpdateFaq } from "../../../../../store/actions/generalAction";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

const useStyles = makeStyles((theme) => ({
  heading: {
    padding: "20px",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
  },
  divAlign: {
    marginTop: "100px",
    marginLeft: "240px",
    backgroundColor: "#E4E4E4",
    minHeight: "calc(100vh - 100px)",
    paddingBottom: "10px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "50px",
      marginLeft: "0px",
      minHeight: "calc(100vh - 50px)",
    },
  },
}));

function Faqs(props) {
  const classes = useStyles();
  const [faqsSelected, setFaqsSelected] = useState({});

  const changeFaqsSelected = (faq) => {
    setFaqsSelected(faq);
  };

  const handleUpdateFaqData = (updatedData) => {
    props.handleUpdateFaq(updatedData);
  };

  useEffect(() => {
    if (props.faqs && props.faqs.length > 0) {
      setFaqsSelected(props.faqs[0]);
    }
  }, [props.faqs]);


  return (
    <div>
      <PageHeader
        title={"Manage Faqs"}
        icon={<LiveHelp fontSize="large" />}
        subTitle={"View and update Faq status"}
      />
      {props.faqs && props.faqs.length > 0 && (
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <FaqTable
              faqs={props.faqs}
              faqsSelected={faqsSelected}
              changeFaqsSelected={changeFaqsSelected}
              handleUpdateFaq={handleUpdateFaqData}
              handleDeleteFaq={props.handleDeleteFaq}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FaqDetails faq={faqsSelected} handleUpdateFaq={handleUpdateFaqData}
              handleDeleteFaq={props.handleDeleteFaq}/>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

const mapStatetoProps = (state) => {
  return {
    profile: state.firebase.profile,
    auth: state.firebase.auth,
    faqs: state.firestore.ordered.faqs,
  };
};
const matchDispatchToProps = (dispatch) => {
    return {
        handleUpdateFaq: (data) => dispatch(handleUpdateFaq(data)),
        handleDeleteFaq: (id) => dispatch(handleDeleteFaq(id))
    }
}
export default compose(
  connect(mapStatetoProps, matchDispatchToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: "faqs",
        orderBy: ["date", "desc"],
      },
    ];
  })
)(Faqs);
