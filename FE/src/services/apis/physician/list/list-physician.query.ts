import { gql } from "@apollo/client";

export interface IListPhysiciansVariables {
  pagination: {
    page: number;
    limit: number;
  };
}

export const LIST_PHYSICIAN_QUERY = gql`
  query Physicians {
    physicians {
      id
      title
    }
  }
`;
