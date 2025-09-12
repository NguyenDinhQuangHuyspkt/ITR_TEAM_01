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
}

module.exports = validatePatientInput;
