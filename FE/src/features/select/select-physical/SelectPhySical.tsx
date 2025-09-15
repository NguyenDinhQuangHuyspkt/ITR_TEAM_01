import { Select } from "antd";
import { useListPhysicians } from "../../../hooks/physician/useAllPhysicians";
import { PAGINATION } from "../../../app/common-type";
import { useMemo } from "react";

interface ISelectPhySicalProps {
  value?: string;
  onChange?: (value: string) => void;
}

const SelectPhySical = ({value, onChange}: ISelectPhySicalProps) => {
  const pagination = useMemo(
    () => ({
      page: PAGINATION.DEFAULT_PAGE,
      limit: PAGINATION.DEFAULT_LIMIT,
    }),
    []
  );

  const {data : listPhysicans , loading} = useListPhysicians(pagination);

  const onHandleChange = (value: string) => {
    console.log(`selected ${value}`);

    if (onChange) {
      onChange(value);
    }
  }

  const parseDataToOptions = ()=>{
    if(!Array.isArray(listPhysicans)) return []

    return listPhysicans.map((item) => ({
    value: item?.id,
    label: item?.title,
  }));
  }
  

  return (
    <Select
      value={value}
      loading={loading}
      onChange={onHandleChange}
      options={parseDataToOptions()}
      style={{fontFamily: "Quicksand, sans-serif"}}
    />
  )
}

export default SelectPhySical
