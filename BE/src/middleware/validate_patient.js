async function validatePatientInput(data) {
  // Email
  if (data.email !== undefined) {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(data.email)) {
      throw new Error('Email không đúng định dạng!');
    }
  }
  // Phone
  if (data.phone !== undefined) {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(data.phone)) {
      throw new Error('Phone phải là 10 chữ số và không chứa ký tự chữ!');
    }
  }
  // DOB
  // if (data.dob !== undefined) {
  //   const dobRegex = /^\d{4}-\d{2}-\d{2}$/;
  //   if (!dobRegex.test(data.dob)) {
  //     throw new Error('Ngày sinh (dob) phải đúng định dạng YYYY-MM-DD!');
  //   }
  // }
  // Có thể kiểm tra thêm các trường khác nếu muốn
}

module.exports = validatePatientInput;
