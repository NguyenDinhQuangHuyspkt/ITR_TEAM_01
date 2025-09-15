import { gql } from "@apollo/client";

export const DELETE_PATIENT_MUTATION = gql`
  mutation DeletePatient($deletePatientId: ID!) {
    deletePatient(id: $deletePatientId)
  }
`;
