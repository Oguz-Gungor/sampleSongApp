import * as React from "react";
import { IComponentProps } from "../../util/CommonInterfaces";
import Card from "../Card/Card";
import "./InfoCard.scss";

export interface IInforCardProps extends IComponentProps {
  imageSource: string;
  label?: string;
  header: string;
  alt?: string;
}

export default function InfoCard(props: IInforCardProps) {
  return (
    <Card className={props.className}>
      <div className="info-card-container flex-column">
        <span className="info-card-header">{props.header}</span>
        {props.label && <span className="info-card-label">{props.label}</span>}
        <img src={props.imageSource} alt={props.alt} />
      </div>
    </Card>
  );
}
