import * as React from "react";
import { IInputProps } from "../../util/CommonInterfaces";

export interface ITextInputProps extends IInputProps {
  onChange?: (value: string) => void;
  placeHolder?: string;
}

export default function TextInput(props: ITextInputProps) {
  return (
    <div className={`flex-column text-input ${props.className}`}>
      {props.label && <span>{props.label}</span>}
      <input
        type={"text"}
        onChange={(event) =>
          props.onChange && props.onChange(event.target.value)
        }
        placeholder={props.placeHolder}
      />
    </div>
  );
}
