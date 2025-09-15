import { Select, type SelectProps } from "antd"
import { GENDER } from "../../../app/common-type";
import type { DefaultOptionType } from "antd/es/select";

type TSelectGenderProps = SelectProps<string> & {
  value?: string;
  onChange?: (value: string) => void;
}

const SelectGender = ({
  value, 
  onChange,
  ...props
}: TSelectGenderProps) => {

  const onHandleChange = (
      _value: string, 
      option?: DefaultOptionType | DefaultOptionType[]
    ) => {
    if (onChange) {
      onChange(option && !Array.isArray(option) ? option.value as string : '');
    }
  }

  return (
    <Select
      value={value}
      onChange={onHandleChange}
      options={[
        { value: GENDER.male, label: 'Male' },
        { value: GENDER.female, label: 'Female' },
      ]}
      style={{fontFamily: "Quicksand, sans-serif"}}
      {...props}
    />
  )
}

export default SelectGender
