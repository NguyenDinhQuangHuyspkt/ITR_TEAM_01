import { gql } from "@apollo/client";

export const LIST_PATIENTS_QUERY = gql`
  query Patients_list($pagination: PaginationInput, $filter: PatientFilterSearch) {
    patients_list(pagination: $pagination, filter: $filter) {
      patients {
        id
        email
        phone
        gender
        dob
        physician {
          id
        }
      }
      pagination {
        currentPage
        totalPages
      }
    }
}
`;
