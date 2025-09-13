import { Button, DatePicker, Form, Input } from "antd";
import { genLabelsFormCreatePatient } from "./utils";
import SelectGender from "../../select/select-gender";
import SelectPhySical from "../../select/select-physical";
import { patientFormRules } from "../../../utils/validation";
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
          name="email"
          rules={patientFormRules.email}
        >
          <Input />
        </Form.Item>

        <Form.Item 
          className="ant-form-item-label" 
          label={labels.phone} 
          name="phone"
          rules={patientFormRules.phone}
        >
          <Input/>
        </Form.Item>

        <Form.Item 
          className="ant-form-item-label" 
          label={labels.gender} 
          name="gender"
          rules={patientFormRules.gender}
        >
          <SelectGender value={form.getFieldValue('gender')}/>
        </Form.Item>

        <Form.Item 
          className="ant-form-item-label" 
          label={labels.physician} 
          name="physicianId"
          rules={patientFormRules.physician}
        >
          <SelectPhySical />
        </Form.Item>

        <Form.Item 
          className="ant-form-item-label" 
          label={labels.dob} 
          name="dob"
          rules={patientFormRules.dob}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item 
          className="ant-form-item-label" 
          label={labels.address} 
          name="address"
          rules={patientFormRules.address}
        >
          <Input />
        </Form.Item>

        <Form.Item 
          className="ant-form-item-label" 
          label={labels.city} 
          name="city"
          rules={patientFormRules.city}
        >
          <Input />
        </Form.Item>

        <Form.Item 
          className="ant-form-item-label" 
          label={labels.state} 
          name="state"
          rules={patientFormRules.state}
        >
          <Input />
        </Form.Item>

        <Form.Item 
          className="ant-form-item-label"
          label={labels.country} 
          name="country" 
          rules={patientFormRules.country}
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
