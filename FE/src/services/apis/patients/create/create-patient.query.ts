import { gql } from "@apollo/client";

export const CREATE_PATIENT_MUTATION = gql`
  mutation CreatePatient($input: CreatePatientInput!) {
    createPatient(input: $input) {
      email
      phone
      gender
      dob
      physician {
        id
      }
      addressInfo {
        address
        city
        state
        country
      }
    }
}
`;
