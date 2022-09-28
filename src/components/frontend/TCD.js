import React from "react";
import Editor from "rich-markdown-editor";

import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

function TCD(props) {
  const TCDDatas = props.TCDData ? props.TCDData[0] : '' 
  return (
    <div style={{ fontSize: 14, padding:"16px" }}>
      <Editor 
        defaultValue={TCDDatas?.content}
        className="editor-description"
        readOnly
        value={TCDDatas?.content}
        
        style={{
          fontFamily: "'Merriweather', serif",
          fontSize: "20px",
          letterSpacing: "0.05em",
        }}
      />
    </div> 
  );
}
const mapStateToProps = (state) => {
  return {
    TCDData: state.firestore.ordered['Term and Condition'],
  };
};


export default compose(
  connect(mapStateToProps, null),
  firestoreConnect((props) => {
    return [
      {
        collection: "Term and Condition",
        doc: "8lcVVxPKA8EyXt8yoSQO",
      },
    ];
  })
)(TCD);
