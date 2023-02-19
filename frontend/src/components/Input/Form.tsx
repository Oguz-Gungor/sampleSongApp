import * as React from "react";
import { IWrapperComponent } from "../../util/CommonInterfaces";
import "./Form.scss"

export interface IFormAttributes extends IWrapperComponent {
  onSubmit?: (form: { [key: string]: any }) => void;
}

export default function Form(props: IFormAttributes) {
  const [formData, setFormData] = React.useState<{ [key: string]: any }>({});
  return (
    <form
      className={props.className}
      onSubmit={(event) => {
        event.preventDefault();
        if (props.onSubmit) {
          props.onSubmit(formData);
        }
      }}
      onInput={(event) => {
        const inputElement = event.target as HTMLInputElement;
        setFormData((prevState) => ({
          ...prevState,
          [inputElement.id]: inputElement.value,
        }));
      }}
    >
      <div className="form-elements-container">
        {props.children}
        <input className="submit-button" type={"submit"} />
      </div>
    </form>
  );
}
