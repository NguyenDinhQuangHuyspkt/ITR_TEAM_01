import { gql } from "@apollo/client";

export const EDIT_PATIENT_MUTATION = gql`
  mutation UpdatePatient($input: UpdatePatientInput!, $updatePatientId: ID!) {
    updatePatient(input: $input, id: $updatePatientId) {
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
      createdAt
      updatedAt
    }
}
`;
