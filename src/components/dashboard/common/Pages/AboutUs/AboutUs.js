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
import { addAboutUsData } from "../../../../../store/actions/generalAction";
import {
  Info,
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

function AddAboutUs(props) {
	const classes = useStyles();
  const [aboutUs, setAboutUs] = useState();
  const [view,setView] = useState(false);
  const [id,setId] = useState();

  const saveChanges = () => (value) => {
    if(value === aboutUs.content){
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
          aboutusId:id,
      }
      props.addAboutUsData(data);
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
      setAboutUs(props.aboutUs ? props.aboutUs[0] : {});
      setId(props.aboutUs ? props.aboutUs[0].aboutusId : {});
  },[props.aboutUs])

    return(
        <div >
          <PageHeader 
          title={"About Us"}
          icon={<Info fontSize="large" />}
          subTitle={"View and update About us status"}
          />
         {/* <button className='button is-link' onClick={()=>{setView(!view)}}>{view?("Hide"):("View")}</button> */}
        <div className="Editor" >
          <div>
            <MarkDownEditorGlobal 
            initialvalue={aboutUs || []}
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
    aboutUs: state.firestore.ordered['About Us'],
  };
};
const matchDispatchToProps = (dispatch) => {
    return {
        openSnackBar: (data) => dispatch(openSnackBar(data)),
        addAboutUsData: (data) => dispatch(addAboutUsData(data)),
        // handleDeleteFaq: (id) => dispatch(handleDeleteFaq(id))
    }
}
export default compose(
  connect(mapStatetoProps, matchDispatchToProps),
  firestoreConnect((props) => {
    return [
      {
        collection: "About Us",
        doc: "UH5PQHkZ9HzetcZkIx2U",
      },
    ];
  })
)(AddAboutUs);