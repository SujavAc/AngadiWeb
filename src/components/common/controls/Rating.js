import React from "react";
import { TextField } from "@material-ui/core";
import { Rating } from "@material-ui/lab";

export default function RatingInput(props) {
  const { name, value, error = null, onChange, ...rest } = props;
  return (
      <div style={{display:'flex',flexDirection:'column',paddingTop:"8px",paddingBottom:"8px",padding:"8px"}}>
    <Rating
    name={name}
    value={value}
    onChange={onChange}
    size="large"
    // onChange={(event, newValue) => {
    //   setValue(newValue);
    // }}
    precision={0.5}
    {...rest}
    
  />
  {error ? <span style={{color:'#f44336', fontSize:"12px", paddingTop:"8px"}}>{error}</span> : ""}
    {/* <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      fullWidth
      InputLabelProps={{ shrink: true }}
      {...rest}
      
    /> */}
    </div>
  );
}
