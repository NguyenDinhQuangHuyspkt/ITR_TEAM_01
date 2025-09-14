import { Button, DatePicker, Form, Input } from "antd";
import { genLabelsFormCreatePatient, patientFormRules } from "./utils";
import SelectGender from "../../select/select-gender";
import SelectPhySical from "../../select/select-physical";
import "./style.scss";
import { useCreatePatient } from "../../../hooks/patients/useCreatePatient";
import { toast } from "react-toastify";

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
          toast .error(`Create patient failed: ${result.message}`);
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
        className="create-patient-form"
      >
        <div className="form-grid">
          <Form.Item 
          className="ant-form-item-label full-width" 
          label={labels.email} 
          name="email"
          rules={patientFormRules.email}
        >
          <Input style={{
          fontFamily: "Quicksand, sans-serif"
        }}/>
        </Form.Item>

        <Form.Item 
          className="ant-form-item-label full-width" 
          label={labels.phone} 
          name="phone"
          rules={patientFormRules.phone}
        >
          <Input style={{
            fontFamily: "Quicksand, sans-serif"
          }}
          />
        </Form.Item>

        <Form.Item 
          className="ant-form-item-label full-width" 
          label={labels.gender} 
          name="gender"
          rules={patientFormRules.gender}
        >
          <SelectGender value={form.getFieldValue('gender')}/>
        </Form.Item>

        <Form.Item 
          className="ant-form-item-label full-width" 
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
          className="ant-form-item-label full-width" 
          label={labels.dob} 
          name="dob"
          rules={patientFormRules.dob}
        >
          <DatePicker 
            style={{
              fontFamily: "Quicksand, sans-serif"
            }}
          />
        </Form.Item>

        <Form.Item 
          className="ant-form-item-label full-width" 
          label={labels.address} 
          name="address"
          rules={patientFormRules.address}
        >
          <Input style={{
          fontFamily: "Quicksand, sans-serif"
        }}/>
        </Form.Item>

        <Form.Item 
          className="ant-form-item-label full-width" 
          label={labels.city} 
          name="city"
          rules={patientFormRules.city}
        >
          <Input style={{
          fontFamily: "Quicksand, sans-serif"
        }}/>
        </Form.Item>

        <Form.Item 
          className="ant-form-item-label full-width" 
          label={labels.state} 
          name="state"
          rules={patientFormRules.state}
        >
          <Input style={{
          fontFamily: "Quicksand, sans-serif"
        }}/>
        </Form.Item>

        <Form.Item 
          className="ant-form-item-label full-width"
          label={labels.country} 
          name="country" 
          rules={patientFormRules.country}
        >
          <Input style={{
          fontFamily: "Quicksand, sans-serif"
        }}/>
        </Form.Item>

        </div>
        <Form.Item label={null} wrapperCol={{ span: 24 }} style={{ textAlign: 'center' }}>
          <Button 
            type="primary" 
            htmlType="submit" 
            onClick={onSubmitForm} 
            style={{ padding: '0 32px', borderRadius: 8 , fontFamily: "Quicksand, sans-serif"}}>
            Create
          </Button>
        </Form.Item>
      </Form>
  );
}

export default FormCreatePatient
