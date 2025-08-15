import {
  DatePicker,
  Input,
  InputNumber,
  Radio,
  Select,
  TimePicker,
} from "antd";
import { JSX, useEffect, useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { CountryCode, parsePhoneNumber } from "libphonenumber-js";

type BaseInputProps = {
  type: string;
  value?: string | number | any;
  onChange?: any;
  options?: any[]; // For select and radio inputs
  mode?: string | any; // For select input mode
  icon?: string; // Icon URL for prefix
  [key: string]: any; // Allow additional props for flexibility
  placeholder?: string;
  initialValue?: any;
  defaultValue?: any;
};

function BaseInput(props: BaseInputProps) {
  const [defaultCountry, setDefaultCountry] = useState<CountryCode>("US");
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (props.type === "phonePicker" && props.value) {
      try {
        const phoneNumber = parsePhoneNumber(props.value as string);
        setDefaultCountry(phoneNumber.country || "US");
      } catch {
        setDefaultCountry("US");
      }
    }
  }, [props.value, props.type]);

  const handleChange = (newValue: any) => {
    if (props.type === "phonePicker") {
      setIsValid(isValidPhoneNumber(newValue || ""));
    }
    if (props.onChange) {
      props.onChange(newValue);
    }
  };

  const inputTypes: { [key: string]: JSX.Element } = {
    text: (
      <Input
        prefix={
          props.icon && (
            <img
              className="w-[24px] !object-contain"
              src={props.icon}
              alt="icon"
            />
          )
        }
        disabled={props.disabled}
        value={props.initialValue}
        className="!rounded-[8px] h-[44px] w-[100%]"
        {...props}
      />
    ),
    textarea: (
      <Input.TextArea
        value={props.initialValue}
        className="!rounded-[8px] !h-[136px]"
        {...props}
      />
    ),
    select: (
      <Select
        mode={props.mode}
        prefix={
          props.icon && <img className="w-[24px]" src={props.icon} alt="icon" />
        }
        onChange={props.onChange}
        maxTagCount="responsive"
        className="!rounded-[8px] h-[44px]"
        options={props.options}
        value={props.initialValue}
        {...props}
      />
    ),
    date: (
      <DatePicker
        format="DD-MM-YYYY"
        className="!rounded-[8px] h-[44px] w-[100%]"
        {...props}
      />
    ),
    time: (
      <TimePicker
        format="HH:mm A"
        defaultValue={props?.defaultValue}
        className="!rounded-[8px] h-[44px] w-[100%]"
        {...props}
      />
    ),
    radio: <Radio.Group options={props.options} {...props} />,
    password: (
      <Input.Password
        prefix={
          props.icon && <img className="w-[24px]" src={props.icon} alt="icon" />
        }
        className="!rounded-[8px] h-[44px] w-[100%]"
        {...props}
      />
    ),
    phonePicker: (
      <div>
        <PhoneInput
          className="custom-phone-input"
          placeholder="Enter phone number"
          defaultCountry={defaultCountry}
          value={props.value as string}
          onChange={handleChange}
          style={{
            border: isValid ? "1px solid #d9d9d9" : "1px solid red",
            borderRadius: "8px",
            padding: "9.5px",
            width: "100%",
          }}
        />
        {!isValid && <span style={{ color: "red" }}>Invalid phone number</span>}
      </div>
    ),
    number: (
      <InputNumber
        prefix={
          props.icon && <img className="w-[24px]" src={props.icon} alt="icon" />
        }
        className="!rounded-[10px] !h-[44px] w-[100%]"
        {...props}
      />
    ),
    signature: (
      <Input
        prefix={
          props.icon && <img className="w-[24px]" src={props.icon} alt="icon" />
        }
        variant="underlined"
        className="h-[44px] w-[100%]"
        {...props}
      />
    ),
  };

  return inputTypes[props.type] || <div>Invalid input type</div>;
}

export default BaseInput;
