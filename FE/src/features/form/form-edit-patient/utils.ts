import type { Rule } from "antd/es/form";

export const genLabelsFormEditPatient = () =>{
  return {
    email: "Email",
    phone: "Phone",
    gender: "Gender",
    dob: "Date of Birth",
    physician: "Physician",
    address: "Address",
    state: "State",
    city: "City",
    country: "Country",
  }
}

export const validationRules = {
  required: (message: string = 'This field is required'): Rule => ({
    required: true,
    message,
  }),

  email: (): Rule => ({
    required: true,
    message: 'Please input email!',
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    type: 'string',
  }),

  phone: (): Rule => ({
    required: true,
    message: 'Please input phone number!',
    pattern: /^\d{10}$/,
    type: 'string',
    len: 10,
  }),

  string: (message: string = 'Please input text!'): Rule => ({
    required: true,
    message,
    type: 'string',
  }),


  dateOfBirth: (): Rule => ({
    validator: (_, value) => {
      if (!value) return Promise.resolve();
      
      const selectedDate = value.toDate();
      const today = new Date();
      today.setHours(23, 59, 59, 999);
      
      if (selectedDate > today) {
        return Promise.reject(new Error('Date of birth cannot be in the future'));
      }
      
      return Promise.resolve();
    },
  }),
};

export const patientFormRules = {
  email: [validationRules.email()],
  phone: [validationRules.phone()],
  gender: [validationRules.required('Please select gender')],
  physician: [validationRules.required('Please select physician')],
  dob: [validationRules.required('Please select date of birth'), validationRules.dateOfBirth()],
  address: [validationRules.required('Please input address!')],
  city: [validationRules.string('Please input city!')],
  state: [validationRules.required('Please input state!')],
  country: [validationRules.string('Please input country!')],
};
