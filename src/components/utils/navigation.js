import React from 'react';
import { useHistory } from "react-router-dom";

export default function Navigate({routeTo,children}) {
    let history = useHistory();
  const handleNavigate = (routeTo) => {
        let path = routeTo;
        history.push(path);
  }

  return (
      <div onClick={()=>{handleNavigate(routeTo)}} style={{cursor: 'pointer'}}>{children}</div>
  )
}