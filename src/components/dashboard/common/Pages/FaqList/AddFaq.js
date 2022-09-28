import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import MarkDownEditorGlobal from "../../components/markdownEditor/markdowneditor";
import axios from "../../apis/axios";
import { sendFaqData } from "../../../../../store/actions/generalAction";
import { openSnackBar } from "../../../../../store/actions/snackBarAction";
import { connect } from "react-redux";
import { compose } from "redux";


export default function AddFaq() {
  const [question, setQuestion] = useState();
  const value = { content: "Type Your Faq answer..." };
  const saveChanges = (answer) => {
    if (!question || !answer) {
    } else {
      const faq = {
        question: question,
        answer: answer,
        date: Date.now(),
      };
    }
  };
  return (
    <>
      <form>
        <div className="field">
          <MarkDownEditorGlobal
            initialvalue={value}
            update={true}
            title={"Add your FAQs"}
            saveChanges={saveChanges}
            darkMode={false}
            switchToTemplate={false}
          />
        </div>
        <div className="field">
          <label className="label">Question</label>
          <input
            className="input"
            placeholder="name"
            name="name"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
      </form>
    </>
  );
}
const mapStatetoProps = (state) => {
  return {
  };
};
const mapDispatchtoProps = (dispatch) => {
  return {
    sendFaqData: (data) => dispatch(sendFaqData(data)),
    openSnackBar: () => dispatch(openSnackBar()),
  };
};
export default compose(
  connect(mapStatetoProps, mapDispatchtoProps)
)(AddFaq);