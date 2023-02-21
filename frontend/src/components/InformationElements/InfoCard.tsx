import * as React from "react";
import { IComponentProps } from "../../util/CommonInterfaces";
import Card from "../Card/Card";
import "./InfoCard.scss";

/**
 * InfoCardComponent props additional to IComponentProps
 */
export interface IInforCardProps extends IComponentProps {
  /**
   * source of image as link
   */
  imageSource: string;
  /**
   * Optional label of card
   */
  label?: string;
  /**
   * Header of card
   */
  header: string;
  /**
   * Alternate value of card
   */
  alt?: string;
}

/**
 * InfoCard component to display specified data and image in card view
 * @param props IInfoCardProps
 * @returns Information card consist of header and image,optionally label
 */
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
