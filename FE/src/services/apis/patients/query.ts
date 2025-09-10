import { gql } from "@apollo/client";

export const LIST_PATIENTS_QUERY = gql`
  query Patients {
    patients {
      patients {
        email
        gender
        phone,
        dob,
      }
    }
  }
`;
