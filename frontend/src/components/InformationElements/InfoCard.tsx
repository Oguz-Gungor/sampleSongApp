import * as React from "react";
import { IComponentProps } from "../../util/CommonInterfaces";
import Card from "../Card/Card";

export interface IInforCardProps extends IComponentProps {
  imageSource: string;
  label: string;
  alt?: string;
}

export default function InfoCard(props: IInforCardProps) {
  return (
    <Card>
      <div className="flex-column">
        <span>{props.label}</span>
        <img src={props.imageSource} alt={props.alt} />
      </div>
    </Card>
  );
}
