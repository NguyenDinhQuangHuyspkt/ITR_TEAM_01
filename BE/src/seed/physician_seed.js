const Physician = require('../models/physician_model');

const defaultPhysicians = [
  {
    email: 'dr.nguyen@hospital.com',
    title: 'Dr. Nguyễn Văn A',
    phone: '0901234567',
    gender: 'MALE',
    dob: '1975-05-15'
  },
  {
    email: 'dr.tran@hospital.com',
    title: 'Dr. Trần Thị B',
    phone: '0907654321',
    gender: 'FEMALE',
    dob: '1980-08-20'
  },
  {
    email: 'dr.le@hospital.com',
    title: 'Dr. Lê Văn C',
    phone: '0909876543',
    gender: 'MALE',
    dob: '1978-03-10'
  }
];

const seedPhysicians = async () => {
  try {
    const count = await Physician.countDocuments();
    
    if (count === 0) {
      await Physician.insertMany(defaultPhysicians);
      console.log('✅ Default physicians created successfully');
    } else {
      console.log('ℹ️ Physicians already exist, skipping seed');
    }
  } catch (error) {
    console.error('❌ Error seeding physicians:', error);
  }
};

module.exports = seedPhysicians;