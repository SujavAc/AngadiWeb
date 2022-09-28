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

function FaqForm(props) {
  const [updatedAnswer,setUpdatedAnswer] = React.useState('');

  const { faq , handleUpdateFaq } = props;


  const initialFValues = {
    question: faq.question ? faq.question : "Question",
  };

  const validate = (fieldValues = values) => {
    let tmp = { ...errors };
    if ("question" in fieldValues)
      tmp.question = fieldValues.question ? "" : "This field is required.";
    
    setErrors({
      ...tmp,
    });
    if (fieldValues === values)
      return Object.values(tmp).every((x) => x === "");
  };

  useEffect(() => {
    setValues({
        question: faq.question,
    });
  }, [faq]);

  const { values, errors, setErrors, handleInputChange, setValues } = useForm(
    initialFValues,
    true,
    validate
  );

  const handleSubmit = () => {
    if (!validate()) {
      setErrors({
        ...errors,
        question: "This field is required",
      });
      return;
    }
    const updatedValue = {
        ...props.faq,
        question: values.question,
      answer: updatedAnswer ? updatedAnswer : faq.answer,
    }
    setUpdatedAnswer('');
    handleUpdateFaq(updatedValue);
  };

  return (
    <>
      
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
            defaultValue={faq.answer ? faq.answer : ""}
            value={faq.answer ? faq.answer : ""}
            onChange={(value)=>{setUpdatedAnswer(value())}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
    </>
  );
}

export default FaqForm;
