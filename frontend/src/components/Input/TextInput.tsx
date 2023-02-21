import * as React from "react";
import { IInputProps } from "../../util/CommonInterfaces";
import "./TextInput.scss";

/**
 * text input props additional to input props
 */
export interface ITextInputProps extends IInputProps {
  /**
   * callback to be handled on value change
   * @param value user input value 
   */
  onChange?: (value: string) => void;
  /**
   * placeholder to be used inside text input
   */
  placeHolder?: string;
  //todo : enum
  //todo : may be moved to input component props
  /**
   * type of input component
   */
  type?: string;
}

/**
 * TextInput component to generate a content with specified utility and style
 * @param props callback on change, placeholder, type, id and label of input element
 * @returns Text input with utility and style
 */
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
