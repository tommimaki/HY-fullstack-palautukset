import React from "react";

const StatusMsg = ({ status }) => {
  if (status.msg) {
    if (status.err) {
      return <div className="errormsg">{status.msg}</div>;
    } else {
      return <div className="statusmsg">{status.msg}</div>;
    }
  }
  return <div></div>;
};

export default StatusMsg;
