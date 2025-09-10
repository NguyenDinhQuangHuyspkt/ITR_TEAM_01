import { DatePicker, Form, Input, Select } from "antd";
import { genLabelsFormCreatePatient } from "./utils";

const FormCreatePatient = () => {
  const labels = genLabelsFormCreatePatient();

  return (
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <Form.Item label={labels.email}>
          <Input />
        </Form.Item>

        <Form.Item label={labels.phone}>
          <Input/>
        </Form.Item>

        <Form.Item label="Select">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="DatePicker">
          <DatePicker />
        </Form.Item>
      </Form>
  );
}

export default FormCreatePatient
