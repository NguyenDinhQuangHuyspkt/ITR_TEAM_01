import { gql } from "@apollo/client";

export const LIST_PATIENTS_QUERY = gql`
  query ListPatients {
    patients {
      email,
      phone,
      gender
    }
  }
`;
