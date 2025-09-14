import React, { useEffect } from "react";
import { Button, DatePicker, Form, Input } from "antd";
import dayjs from "dayjs";
import { genLabelsFormEditPatient, patientFormRules } from "./utils";
import SelectGender from "../../select/select-gender";
import SelectPhySical from "../../select/select-physical";
import { useEditPatient } from "../../../hooks/patients/useEditPatient";
import type { IPatient } from "../../../services/apis/patients/type-common";
import "./style.scss";

interface IFormEditPatientProps {
  patient: IPatient;
  onSuccess?: () => void;
}

const FormEditPatient: React.FC<IFormEditPatientProps> = ({ patient ,onSuccess}) => {
  const { editPatient } = useEditPatient();
  const labels = genLabelsFormEditPatient();
  const [form] = Form.useForm();

  useEffect(() => {
    if (!patient) return;

    form.setFieldsValue({
      email: patient.email,
      phone: patient.phone,
      gender: patient.gender,
      physicianId: patient.physician?.id,
      dob: patient.dob ? dayjs(patient.dob) : undefined,
      address: patient.addressInfo?.address,
      city: patient.addressInfo?.city,
      state: patient.addressInfo?.state,
      country: patient.addressInfo?.country,
    });
  }, [patient, form]);

  const onSubmitForm = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        input: {
          email: values.email,
          phone: values.phone,
          gender: values.gender,
          dob: values.dob ? values.dob.toISOString() : undefined,
          addressInfo: {
            address: values.address,
            city: values.city,
            state: values.state,
            country: values.country,
          },
          physicianId: values.physicianId,
        },
        updatePatientId: patient.id,
      };

      editPatient(payload, (result) => {
        if (result.status === "success") {
          console.log("Patient updated successfully:", result.data);
          if (onSuccess) {
            onSuccess();
          }
        } else if (result.status === "error") {
          console.error("Error updating patient:", result?.message);
        }
      });
    } catch (err) {
      console.warn("Validation failed:", err);
    }
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 5 }}
      layout="horizontal"
      style={{ maxWidth: 'auto' }}
      onFinish={onSubmitForm}
      className="edit-patient-form"
    >
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
        }}/>
      </Form.Item>

      <Form.Item 
        className="ant-form-item-label full-width" 
        label={labels.gender} 
        name="gender" 
        rules={patientFormRules.gender}
      >
        <SelectGender />
      </Form.Item>

      <Form.Item 
        className="ant-form-item-label full-width" 
        label={labels.physician} 
        name="physicianId" 
        rules={patientFormRules.physician}
      >
        <SelectPhySical />
      </Form.Item>

      <Form.Item 
        className="ant-form-item-label full-width" 
        label={labels.dob} 
        name="dob" 
        rules={patientFormRules.dob}
      >
        <DatePicker style={{
          fontFamily: "Quicksand, sans-serif"
        }}/>
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

      <Form.Item label={null}  wrapperCol={{ span: 24 }} style={{ textAlign: 'center' }}>
        <Button 
          type="primary" 
          htmlType="submit" 
          style={{ 
            padding: '0 32px', 
            borderRadius: 8 , 
            fontFamily: "Quicksand, sans-serif"
          }}
        >
          Edit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormEditPatient;
