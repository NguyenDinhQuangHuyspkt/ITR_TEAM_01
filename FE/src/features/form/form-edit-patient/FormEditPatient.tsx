import React, { useEffect } from "react";
import { Button, DatePicker, Form, Input } from "antd";
import dayjs from "dayjs";
import { genLabelsFormEditPatient } from "./utils";
import SelectGender from "../../select/select-gender";
import SelectPhySical from "../../select/select-physical";
import { useEditPatient } from "../../../hooks/patients/useEditPatient";
import type { IPatient } from "../../../services/apis/patients/type-common";

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
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      style={{ maxWidth: 600 }}
      onFinish={onSubmitForm}
    >
      <Form.Item className="ant-form-item-label" label={labels.email} name="email">
        <Input />
      </Form.Item>

      <Form.Item className="ant-form-item-label" label={labels.phone} name="phone">
        <Input />
      </Form.Item>

      <Form.Item className="ant-form-item-label" label={labels.gender} name="gender">
        <SelectGender />
      </Form.Item>

      <Form.Item className="ant-form-item-label" label={labels.physician} name="physicianId">
        <SelectPhySical />
      </Form.Item>

      <Form.Item className="ant-form-item-label" label={labels.dob} name="dob">
        <DatePicker />
      </Form.Item>

      <Form.Item className="ant-form-item-label" label={labels.address} name="address">
        <Input />
      </Form.Item>

      <Form.Item className="ant-form-item-label" label={labels.city} name="city">
        <Input />
      </Form.Item>

      <Form.Item className="ant-form-item-label" label={labels.state} name="state">
        <Input />
      </Form.Item>

      <Form.Item className="ant-form-item-label" label={labels.country} name="country">
        <Input />
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FormEditPatient;
