import { Button, DatePicker, Form, Input } from "antd";
import { genLabelsFormCreatePatient } from "./utils";
import SelectGender from "../../select/select-gender";
import SelectPhySical from "../../select/select-physical";
import "./style.scss";
import { useCreatePatient } from "../../../hooks/patients/useCreatePatient";

const FormCreatePatient = () => {
   const { createPatient } = useCreatePatient();
  
  const labels = genLabelsFormCreatePatient();

  const [form] = Form.useForm();

  const onSubmitForm = () => {
    createPatient(
      {
        email: form.getFieldValue('email'),
        phone: form.getFieldValue('phone'),
        gender: form.getFieldValue('gender'),
        physicianId: form.getFieldValue('physicianId'),
        dob: form.getFieldValue('dob')?.toISOString(),
        addressInfo: {
          address: form.getFieldValue('address'),
          city: form.getFieldValue('city'),
          state: form.getFieldValue('state'),
          country: form.getFieldValue('country'),
        }
      },
      (result) => {
        if (result.status === "success") {
          console.log("Patient created successfully:", result.data);
          form.resetFields();
        } else if (result.status === "error") {
          console.error("Error creating patient:", result?.message);
        }
      }
    );
  };

  return (
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <Form.Item 
          className="ant-form-item-label" 
          label={labels.email} 
          name ="email"
        >
          <Input />
        </Form.Item>

        <Form.Item 
          className="ant-form-item-label" 
          label={labels.phone} 
          name="phone"
        >
          <Input/>
        </Form.Item>

        <Form.Item 
          className="ant-form-item-label" 
          label={labels.gender} 
          name ='gender'
        >
          <SelectGender value={form.getFieldValue('gender')}/>
        </Form.Item>

        <Form.Item 
          className="ant-form-item-label" 
          label = {labels.physician} 
          name = 'physicianId'
        >
          <SelectPhySical />
        </Form.Item>

        <Form.Item 
          className="ant-form-item-label" 
          label={labels.dob} 
          name='dob'
        >
          <DatePicker />
        </Form.Item>

        <Form.Item 
          className="ant-form-item-label" 
          label={labels.address} 
          name ="address"
        >
          <Input />
        </Form.Item>

        <Form.Item 
          className="ant-form-item-label" 
          label={labels.city} 
          name ="city"
        >
          <Input />
        </Form.Item>

        <Form.Item 
          className="ant-form-item-label" 
          label={labels.state} 
          name ="state"
        >
          <Input />
        </Form.Item>

        <Form.Item 
          className="ant-form-item-label"
          label={labels.country} 
          name ="country" 
        >
          <Input />
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
