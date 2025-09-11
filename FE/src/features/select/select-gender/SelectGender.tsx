import { Select } from "antd"
import { GENDER } from "../../../app/common-type";

interface ISelectGenderProps {
  value?: string;
  onChange?: (value: string) => void;
}

const SelectGender = ({value, onChange}: ISelectGenderProps) => {
  const onHandleChange = (value: string) => {
    console.log(`selected ${value}`);

    if (onChange) {
      onChange(value);
    }
  }

  return (
    <Select
      value={value}
      style={{ width: 120 }}
      onChange={onHandleChange}
      options={[
        { value: GENDER.male, label: 'Male' },
        { value: GENDER.female, label: 'Female' },
      ]}
    />
  )
}

export default SelectGender
