import React, { useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Edit from "@material-ui/icons/Edit";
import Controls from "../../../../common/controls/Controls";
import useForm from "../../../../common/useForm";
import RichMarkdownEditor from "rich-markdown-editor";

function FaqEditDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [updatedAnswer,setUpdatedAnswer] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { question, answer, callbackUpdate } = props;


  const initialFValues = {
    question: question ? question : "Question",
    // answer: answer ? answer : "Answer",
  };

  const validate = (fieldValues = values) => {
    let tmp = { ...errors };
    if ("question" in fieldValues)
      tmp.question = fieldValues.question ? "" : "This field is required.";
    // if ("answer" in fieldValues)
    //   tmp.answer = fieldValues.answer
    //     ? ""
    //     : "This field is required.";
    setErrors({
      ...tmp,
    });
    if (fieldValues === values)
      return Object.values(tmp).every((x) => x === "");
  };

  useEffect(() => {
    setValues({
        question: props.question,
    //   answer: props.answer,
    });
  }, [props.question]);

  const { values, errors, setErrors, handleInputChange, setValues } = useForm(
    initialFValues,
    true,
    validate
  );

  const handleSubmit = () => {
    if (!validate()) {
      setErrors({
        ...errors,
        // answer: "This field is required",
        question: "This field is required",
      });
      return;
    }
    const updatedValue = {
        ...props.initialData,
        question: values.question,
      answer: updatedAnswer ? updatedAnswer : answer,
    }
    setUpdatedAnswer('');
    callbackUpdate(updatedValue);
    setOpen(false);
  };

  return (
    <>
      <IconButton aria-label="edit" onClick={handleClickOpen} color="primary">
        <Edit />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit FAQ Questions</DialogTitle>
        <DialogContent>
          <DialogContentText>Edit FAQ</DialogContentText>
          <Controls.InputArea
            name="question"
            label="Question"
            value={values.question}
            onChange={handleInputChange}
            rowsMax={3}
            style={{ width: "100%", marginTop: 8 }}
            error={errors.question}
          />
          <RichMarkdownEditor
            defaultValue={answer || ""}
            onChange={(value)=>{setUpdatedAnswer(value())}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FaqEditDialog;
