const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const session = require('express-session');
const jwt = require('jsonwebtoken');

  // experimental
const INIT_ADMIN = false;

/*const adminLogin =  async (req, res) => {
    const { username, password } = req.body;

    // Validate credentials against admin data source
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const saltedPass = await bcrypt.hash(password, 10);
    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
        console.log("admin failed on password mismatch, sent password: " + saltedPass + ", real password (hashes): " + admin.password);
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Create session for authenticated admin
    req.session.adminId = admin._id;

    res.json({ message: 'Login successful' });
  };*/

  const adminLogin = async (req, res) => {
    const { username, password } = req.body;
  
    // Validate credentials against admin data source
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
  
    const passwordMatch = await bcrypt.compare(password, admin.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
  
    // Store admin's _id in session
    req.session.adminId = admin._id;
    // Generate JWT token
    const token = jwt.sign({ adminId: admin._id }, 'your-secret-key');
    res.json({ token });
    console.log('sending token:' + token);

  };
  
const checkSession = (req, res) => {
  if (req.session.adminId) {
    // Admin is authenticated
    res.json({ isAdminAuthenticated: true });
  } else {
    // Admin is not authenticated
    res.json({ isAdminAuthenticated: false });
  }
};

const verifyToken = (req, res, next) => {
  const { token } = req.body;
  console.log("token!!"+token)
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.adminId = decoded.adminId;
    console.log("sending 200 now!!!");
    res.status(200).json();
  });
};


module.exports = {
    adminLogin,
    verifyToken,
};

// marked for deletion
const createAdmin = async () => {
      // Hash the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash("123", saltRounds);

    const admin = Admin({username: "admin",
    password: hashedPassword,
    isLoggedIn: false,
    allPermissions: true});
    const res = await admin.save();
    console.log("Admin saved: " + JSON.stringify(res));
}

if( INIT_ADMIN) createAdmin();