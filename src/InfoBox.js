import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./infoBox.css"
function InfoBox({ title, cases,active, total,...props}) {

  return (
    <Card className={`infobox  ${active && "infoBox--selected"}`} onClick={props.onClick} >
      <CardContent>
        <Typography  color="textSecondary" className="infoBox__title">
          {title}
        </Typography>
        <h2 className="infoBox__cases ">{cases}</h2>
        <Typography color="textSecondary" className="infoBox__total">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}

export default InfoBox;
