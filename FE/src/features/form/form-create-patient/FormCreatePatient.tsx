import { Button, DatePicker, Form, Input } from "antd";
import { genLabelsFormCreatePatient } from "./utils";
import SelectGender from "../../select/select-gender";
import SelectPhySical from "../../select/select-physical";

const FormCreatePatient = () => {
  const labels = genLabelsFormCreatePatient();

  const [form] = Form.useForm();

  const onSubmitForm = () => {
    console.log('submit form', form.getFieldsValue());
  }

  return (
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <div>
          <label>{labels.email}</label>
        
          <Form.Item name ="email">
            <Input />
          </Form.Item>
        </div>

        <Form.Item label={labels.phone} name="phone">
          <Input/>
        </Form.Item>

        <Form.Item label={labels.gender} name ='gender'>
          <SelectGender value={form.getFieldValue('gender')}/>
        </Form.Item>

        <Form.Item label = {labels.physician} name = 'physicianId'>
          <SelectPhySical />
        </Form.Item>

        <Form.Item label="DatePicker" name='dob'>
          <DatePicker />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" onClick={onSubmitForm}>
            Submit
          </Button>
        </Form.Item>
      </Form>
  );
}

export default FormCreatePatient
