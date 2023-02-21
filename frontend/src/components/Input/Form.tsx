import * as React from "react";
import { IWrapperComponent } from "../../util/CommonInterfaces";
import "./Form.scss"

/**
 * Form data attributes additional to IWrapperComponentProps
 */
export interface IFormAttributes extends IWrapperComponent {
  /**
   * Callback to be handled on submit
   * @param form current structure of form 
   */
  onSubmit?: (form: { [key: string]: any }) => void;
}

/**
 * Form component to combine forms of html input component with React flux
 * @param props IFormAttributes
 * @returns HTML form element integrated with React
 */
export default function Form(props: IFormAttributes) {
  //Form data and its dispatcher
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
