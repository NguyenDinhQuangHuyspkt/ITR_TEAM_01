import { Button, DatePicker, Form, Input } from "antd";
import { genLabelsFormCreatePatient } from "./utils";
import SelectGender from "../../select/select-gender";
import SelectPhySical from "../../select/select-physical";
import "./style.scss";
import { useCreatePatient } from "../../../hooks/patients/useCreatePatient";

interface IFormCreatePatientProps {
  onSuccess?: () => void;
}

const FormCreatePatient : React.FC<IFormCreatePatientProps>= ({
  onSuccess
}) => {
   const { createPatient } = useCreatePatient();
  
  const labels = genLabelsFormCreatePatient();

  const [form] = Form.useForm();

  const onSubmitForm = async () => {
    try {
      const values = await form.validateFields();
      
      const payload = {
        email: values.email,
        phone: values.phone,
        gender: values.gender,
        physicianId: values.physicianId,
        dob: values.dob ? values.dob.toISOString() : undefined,
        addressInfo: {
          address: values.address,
          city: values.city,
          state: values.state,
          country: values.country,
        },
      };

      await createPatient(payload, (result) => {
        if (result.status === "success") {
          form.resetFields();
          if (onSuccess) {
            console.log('Calling onSuccess callback');
            onSuccess();
          }
          
        } else if (result.status === "error") {
          console.error("Create patient error:", result.message);
        }
      });
    } catch (err) {
      console.warn("Submit failed", err);
    }
  };

  return (
      <Form
        form={form}
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <Form.Item 
          className="ant-form-item-label" 
          label={labels.email} 
          name ="email"
          rules={
            [
              { 
                required: true, 
                message: 'Please input email!',
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ ,
                type: 'string'
              }
            ]}
        >
          <Input />
        </Form.Item>

        <Form.Item 
          className="ant-form-item-label" 
          label={labels.phone} 
          name="phone"
          rules={
            [
              { 
                required: true, 
                message: 'Please input phone number!',
                pattern: /^\d{10}$/,
                type: 'string',
                len: 10
              }
            ]}
        >
          <Input/>
        </Form.Item>

        <Form.Item 
          className="ant-form-item-label" 
          label={labels.gender} 
          name ='gender'
          rules={[
            { 
              required: true, 
              message: 'Please select gender'
            }
          ]}
        >
          <SelectGender value={form.getFieldValue('gender')}/>
        </Form.Item>

        <Form.Item 
          className="ant-form-item-label" 
          label = {labels.physician} 
          name = 'physicianId'
          rules={[
            { 
              required: true, 
              message: 'Please select physician'
            }
          ]}
        >
          <SelectPhySical />
        </Form.Item>

        <Form.Item 
          className="ant-form-item-label" 
          label={labels.dob} 
          name='dob'
          rules={[
            { 
              required: true, 
              message: 'Please select date of birth'
            }
          ]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item 
          className="ant-form-item-label" 
          label={labels.address} 
          name ="address"
          rules={[
            { 
              required: true, 
              message: 'Please input address!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item 
          className="ant-form-item-label" 
          label={labels.city} 
          name ="city"
          rules={[
            { 
              required: true, 
              message: 'Please input city!',
              type: 'string'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item 
          className="ant-form-item-label" 
          label={labels.state} 
          name ="state"
          rules={[
            { 
              required: true, 
              message: 'Please input state!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item 
          className="ant-form-item-label"
          label={labels.country} 
          name ="country" 
          rules={[
            { 
              required: true, 
              message: 'Please input country!',
              type: 'string'
            }
          ]}
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
