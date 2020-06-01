import React from 'react';
import { Alert } from 'reactstrap';

function AlertConfirm() {
  return (
    <Alert color="info" style={{marginBottom: "0px", paddingTop: "20px", borderRadius: "0"}}>
     <span style={{fontFamily: "Fira Sans Medium, sans-serif"}}> Please check your email and verify your account! </span>
    </Alert>
  );
}

export default AlertConfirm;