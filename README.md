## ITR TEAM 01 – Project README

### 1) Phân chia công việc (Who did what)
- **Member A: Nguyễn Đình Quang Huy**:
  - Vite + React + TypeScript + Ant Design + Apollo Client + lớp `GraphqlCaller` (Observer pattern)
  - List Patients: bảng, search debounce theo email
  - Modal Create, Update, Delete Patient
  - Notify cho người dùng khi hoạt động (thêm, xóa, sửa) với patient thành công / báo lỗi.
  - Error Boundary
- **Member B: Phan Văn Tài**:
  - BE
    - Thiết kế GraphQL schema (Patients/Physicians), resolver, service (Mongoose), khởi tạo Apollo Server.
    - Pagination, filter theo email, populate physician
    - Soft delete cho Patient: `patient_status.isActive = false`
    - Seed và cấu hình kết nối MongoDB<br>
  - FE
    - pagination client → server
    - Modal Patient Detail (tách 2 cột: Patient | Physician)

### 2) Hướng dẫn chạy local

#### 2.1. Yêu cầu
- Node.js LTS (>= 18)
- PNPM/NPM/Yarn (tùy chọn)
- MongoDB chạy local dùng Docker

#### 2.2. Chạy database bằng Docker:
```bash
cd ITR_TEAM_01
docker compose up -d
# Backend on http://localhost:4000/graphql
# Frontend on http://localhost:5173
```

#### 2.3. Start BE và FE:
- Backend
```bash
cd ITR_TEAM_01/BE
npm install
# Thiết lập biến môi trường nếu cần (ví dụ .env):
# MONGO_URI=mongodb://localhost:27017/itr_team_01
# PORT=4000
npm run dev
# GraphQL Playground: http://localhost:4000/graphql
```

- Frontend
```bash
cd ITR_TEAM_01/FE
npm install
npm run dev
# App: http://localhost:5173
```

### 3) API (GraphQL)

#### 3.1. Endpoint
- BE GraphQL: `http://localhost:4000/graphql`

#### 3.2. Patient – Queries
- List patients (có phân trang + filter email, chỉ trả active)
```graphql
query Patients_list($pagination: PaginationInput, $filter: PatientFilterSearch) {
  patients_list(pagination: $pagination, filter: $filter) {
    patients {
      id
      email
      phone
      gender
      dob
      physician { id }
      addressInfo { address city state country }
    }
    pagination {
      currentPage
      totalPages
      totalItems
      hasNextPage
      hasPrevPage
    }
  }
}
```
Ví dụ variable truyền vào query:
```json
{
  "pagination": { "page": 1, "limit": 10 },
  "filter": { "email": "john" }
}
```

- Patient detail (kèm physician)
```graphql
query Patient($patientId: ID!) {
  patient(id: $patientId) {
    id
    email
    phone
    gender
    dob
    addressInfo { address city state country }
    physician { 
      id 
      email 
      title 
      phone 
      gender 
      dob 
    }
  }
}
```

#### 3.3. Patient – Mutations
- Create
```graphql
mutation Mutation($input: CreatePatientInput!) {
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
```
Input mẫu:
```json
{
  "input": {
    "email": "john@example.com",
    "phone": "0123456789",
    "gender": "MALE",
    "dob": "1990-01-01",
    "physicianId": "<PHYSICIAN_ID>",
    "addressInfo": {"address":"A","city":"B","state":"C","country":"D"}
  }
}
```

- Update
```graphql
mutation Mutation($updatePatientId: ID!, $input: UpdatePatientInput!) {
  updatePatient(id: $updatePatientId, input: $input) {
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
```

Input mẫu:
```json
{
  "input": {
    "email": "john@example.com",
    "phone": "0123456789",
    "gender": "MALE",
    "dob": "1990-01-01",
    "physicianId": "<PHYSICIAN_ID>",
    "addressInfo": {"address":"A","city":"B","state":"C","country":"D"},
    "updatePatientId": "..."
  }
}
```


- Delete (Soft delete)
```graphql
mutation DeletePatient($id: ID!) {
  deletePatient(id: $id)
}
```

Input mẫu:
```json
{
  "deletePatientId": "..."
}
```

Ghi chú: Delete chỉ đặt `patient_status.isActive = false`. Các query list chỉ trả về patient có `isActive = true`.

#### 3.4. Physician – Queries
```graphql
query Physicians {
  physicians {
    id
    email
    title
    phone
    gender
    dob
  }
}

query Physician($id: ID!) {
  physician(id: $id) {
    id
    email
    title
  }
}
```