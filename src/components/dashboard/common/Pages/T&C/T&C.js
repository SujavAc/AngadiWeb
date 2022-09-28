import React, { useEffect, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import MarkDownEditorGlobal from "../../components/markdownEditor/markdowneditor";
// import 'react-toastify/dist/ReactToastify.css';
// import Layout from "../../components/Layout/Layout";
// import axios from "../../apis/axios";
import { makeStyles } from "@material-ui/core/styles";
import MarkDownEditorGlobal from '../../../../frontend/Editor/GlobalEditor';
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { openSnackBar } from "../../../../../store/actions/snackBarAction";
import { addTAndCData } from "../../../../../store/actions/generalAction";
import {
  Subject,
} from "@material-ui/icons";
import PageHeader from "../../PageHeader";

const useStyles = makeStyles((theme) => ({
	divAlign: {
	  backgroundColor: "#E4E4E4",
	  minHeight: "calc(100vh - 100px)",
	  width: "100%",
	  paddingBottom: "10px",
	  [theme.breakpoints.down("xs")]: {
		marginTop: "50px",
		width: "100%",
		marginLeft: "0px",
		minHeight: "calc(100vh - 50px)",
	  },
	},
  }));

function TAndC(props) {
	const classes = useStyles();
  const [tcs, setTcs] = useState();
  const [id,setId] = useState();

  const saveChanges = () => (value) => {
    if(value === tcs.content){
      const payload = {
        variant: "info",
        message:
          "Change the content before trying to save it",
        disableSubmit: false,
      };
      props.openSnackBar(payload);
    }
    else{
      if(id){
        const data = {
          content: value,
          date:Date.now(),
          termId:id,
      }
      props.addTAndCData(data);
      }else{
        const payload = {
          variant: "error",
          message:
            "Couldn't change the content, try again!!!",
          disableSubmit: false,
        };
        props.openSnackBar(payload);
      }
        
      
    }
    
  };
  useEffect(()=>{
      setTcs(props.TCDData ? props.TCDData[0] : {});
      setId(props.TCDData ? props.TCDData[0].termId : {});
  },[props.TCDData])

    return(
        <div >
          <PageHeader
            title={"Terms & Condition"}
            icon={<Subject fontSize="large" />}
            subTitle={"View and update Terms and Condition"}
          />
         {/* <button className='button is-link' onClick={()=>{setView(!view)}}>{view?("Hide"):("View")}</button> */}
        <div className="Editor" >
          <div>
            <MarkDownEditorGlobal 
            initialvalue={tcs || []}
            update={true}
            title={'Update About Us Page Here'}
            saveChanges={saveChanges()}
            darkMode={false}
            switchToTemplate={false}
            />
              
              {/* {view && view.lenght > 0 ?(
                <MarkDownEditorGlobal 
                readonly={true}
                update={false}
                initialvalue={aboutUs}
                saveChanges={saveChanges()}
                darkMode={false}
                switchToTemplate={false}
                />
              ):(<></>)} */}
              </div>
            </div>
          </div>
    )
}
const mapStatetoProps = (state) => {
  return {
    TCDData: state.firestore.ordered['Term and Condition'],
  };
};
const matchDispatchToProps = (dispatch) => {
    return {
        openSnackBar: (data) => dispatch(openSnackBar(data)),
        addTAndCData: (data) => dispatch(addTAndCData(data)),
        // handleDeleteFaq: (id) => dispatch(handleDeleteFaq(id))
    }
}
export default compose(
  connect(mapStatetoProps, matchDispatchToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: "Term and Condition",
        doc: "8lcVVxPKA8EyXt8yoSQO",
      },
    ];
  })
)(TAndC);