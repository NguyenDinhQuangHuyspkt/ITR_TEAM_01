import { gql } from "@apollo/client";

export const PATIENT_DETAIL_QUERY = gql`
  query Patient($patientId: ID!) {
    patient(id: $patientId) {
      id
      email
      phone
      gender
      dob
      physician {
        id
        email
        title
        phone
        gender
        dob
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