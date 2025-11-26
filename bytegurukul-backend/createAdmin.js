require('dotenv').config(); // Load environment variables for DB connection
const bcrypt = require('bcryptjs'); // Changed from 'bcrypt' to 'bcryptjs'
const db = require('./models'); // Import the whole db object

async function createAdmin() {
  try {
    // 1. Define credentials
    const username = 'admin'; // Added required username
    const email = 'admin@bytegurukul.com';
    const password = 'admin123'; 
    const name = 'Super Admin';
    const phone = '9999999999';

    // 2. Check for User model (handles case sensitivity)
    const User = db.User || db.user; 
    if (!User) {
      throw new Error('User model not found in ./models. Check your model export name.');
    }

    // 3. Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Check if admin exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log('⚠️  Admin user already exists!');
      return;
    }

    // 5. Create Admin
    await User.create({
      username, // Added username field here
      name,
      email,
      password: hashedPassword,
      phone,
      role: 'admin'
    });

    console.log('=========================================');
    console.log('✅ ADMIN ACCOUNT CREATED SUCCESSFULLY');
    console.log('=========================================');
    console.log(`Login URL: http://localhost:3000/login`);
    console.log(`Username:  ${username}`);
    console.log(`Email:     ${email}`);
    console.log(`Password:  ${password}`);
    console.log('=========================================');

  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
  } finally {
    // Close DB connection so the script exits properly
    if(db.sequelize) {
        await db.sequelize.close();
    }
  }
}

createAdmin();