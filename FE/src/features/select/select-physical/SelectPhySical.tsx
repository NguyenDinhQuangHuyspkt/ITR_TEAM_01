import { useEffect, useState } from "react";
import { ListPhysiciansApi } from "../../../services/apis/physician/list/list-physician.svc";
import type { TApiResult } from "../../../services/types";
import type { IPhysician } from "../../../services/apis/physician/type";
import { useApolloClient } from "@apollo/client/react";
import { Select } from "antd";

interface ISelectPhySicalProps {
  value?: string;
  onChange?: (value: string) => void;
}

const SelectPhySical = ({value, onChange}: ISelectPhySicalProps) => {
  const [data, setData] = useState<IPhysician[]>([]);
  const [loading, setLoading] = useState(false);

  const client = useApolloClient()

  const onHandleChange = (value: string) => {
    console.log(`selected ${value}`);

    if (onChange) {
      onChange(value);
    }
  }

  const parseDataToOptions = ()=>{
    if(!Array.isArray(data)) return []

    return data.map((item) => ({
    value: item.id,
    label: item.title,
  }));
  }
  
  useEffect(() => {
    const ClsListPatients = new ListPhysiciansApi(client);

    const observer = {
      update: (result: TApiResult<IPhysician[]>) => {
        setLoading(result.status === "loading");
        if (result.status === "success" && result.data) {
          setData((result?.data || []).filter((item): item is IPhysician => item !== undefined));
        }
      },
    };

    ClsListPatients.attach(observer);
    ClsListPatients.execute({ pagination: { page: 1, limit: 10 } }).catch(() => {});

    return () => {
      ClsListPatients.detach(observer);
    };
  }, [client]);

  return (
    <Select
      value={value}
      loading={loading}
      style={{ width: 120 }}
      onChange={onHandleChange}
      options={parseDataToOptions()}
    />
  )
}

export default SelectPhySical
