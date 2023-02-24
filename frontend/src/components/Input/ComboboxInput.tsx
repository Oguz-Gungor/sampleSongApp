import { IInputProps } from "../../util/CommonInterfaces";
import LabelConfig from "../../config/LabelConfig.json";
/**
 * combobox input props additional to input props
 */
export interface ITextInputProps extends IInputProps {
  /**
   * callback to be handled on value change
   * @param value user input value
   */
  onChange?: (value: string) => void;
  /**
   * list of options with label-id structure
   */
  options: { label: string; id: number }[];
}

/**
 * ComboboxInput component to generate a content with specified utility and style
 * @param props callback on change, placeholder, type, id and label of input element
 * @returns Combobox input with utility and style
 */
export default function ComboboxInput(props: ITextInputProps) {
  return (
    <div className={`flex-column combobox-input ${props.className}`}>
      {props.label && <span>{props.label}</span>}
      <select
        id={props.id}
        onChange={(event) => props.onChange && props.onChange(event.target.value)}
      >
        <option hidden disabled selected>
          {LabelConfig.PLAYLIST_SELECT_PLACEHOLDER}
        </option>
        {props.options.map(({ id, label }) => (
          <option value={id}>{label}</option>
        ))}
      </select>
    </div>
  );
}

// <input
//   id={props.id}
//   type={"text"}
//   onChange={(event) =>
//     props.onChange && props.onChange(event.target.value)
//   }
// />
