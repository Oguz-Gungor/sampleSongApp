import * as React from "react";
import { IInputProps } from "../../util/CommonInterfaces";
import "./TextInput.scss";

export interface ITextInputProps extends IInputProps {
  id?: string;
  onChange?: (value: string) => void;
  placeHolder?: string;
  //todo : enum
  type?: string;
}

export default function TextInput(props: ITextInputProps) {
  return (
    <div className={`flex-column text-input ${props.className}`}>
      {props.label && <span>{props.label}</span>}
      <input
        id={props.id}
        type={props.type ?? "text"}
        onChange={(event) =>
          props.onChange && props.onChange(event.target.value)
        }
        placeholder={props.placeHolder}
      />
    </div>
  );
}
