import express from 'express'
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs'

const router = express.Router()

router.post("/employee_login", (req, res) => {
  const sql = "SELECT * from employee Where email = ?";
  con.query(sql, [req.body.email], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      bcrypt.compare(req.body.password, result[0].password, (err, response) => {
        if (err) return res.json({ loginStatus: false, Error: "Wrong Password" });
        if (response) {
          const email = result[0].email;
          const employee_name = result[0].name;
          const employee_id = result[0].id;
          const token = jwt.sign(
            { role: "employee", email: email, id: result[0].id },
            "jwt_secret_key",
            { expiresIn: "1d" }
          );
          res.cookie('token', token)
          req.session.employee_id = employee_id;
          req.session.employee_name = employee_name;
          console.log(req.session.employee_id);
          return res.json({ loginStatus: true, id: result[0].id });
        }
      })

    } else {
      return res.json({ loginStatus: false, Error: "Incorrect email or password. Please try again." });
    }
  });
});


router.post('/add_message', (req, res) => {
  const user_id = req.session.employee_id;
  const { content } = req.body;
  const sql = "INSERT INTO messages (user_id, content, timestamp) VALUES (?, ?, NOW())";

  con.query(sql, [user_id, content], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true });
  });
});


router.get('/get_messages', (req, res) => {
  const sql = "SELECT messages.*, COALESCE(employee.name, admin.name) as name, CASE WHEN admin.name IS NOT NULL THEN 'admin' ELSE 'employee' END as userType FROM messages LEFT JOIN employee ON messages.user_id = employee.id LEFT JOIN admin ON messages.user_id = admin.id";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result });
  });
});
/* function authenticateToken(req, res, next) {
   const token = req.cookies.token;
   if (!token) return res.status(401).json({ message: 'Authentication failed' });
 
   jwt.verify(token, 'jwt_secret_key', (err, user) => {
     if (err) return res.status(403).json({ message: 'Invalid token' });
     req.user = user;
     next();
   });
 }

 router.get('/employee', authenticateToken, (req, res) => {
*/
router.get('/detail/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT employee.*, category.name AS category_name FROM employee JOIN category ON employee.category_id = category.id WHERE employee.id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false });
    return res.json(result)
  })
})
router.get('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true, // same options you used when setting the cookie
    secure: true, // same options you used when setting the cookie
    sameSite: 'none' // same options you used when setting the cookie
  });
  return res.json({ Status: true });
});


router.put('/updatePassword/:id', (req, res) => {
  const id = req.params.id;
  const { oldPassword, newPassword } = req.body;
  const sql = "SELECT *, bio FROM employee where id = ?"
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query error" });
    if (result.length > 0) {
      bcrypt.compare(oldPassword, result[0].password, (err, response) => {
        if (err) return res.json({ Status: false, Error: "Wrong Password" });
        if (response) {
          bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
            if (err) return res.json({ Status: false, Error: "Hashing error" });
            const sqlUpdate = "UPDATE employee SET password = ? WHERE id = ?";
            con.query(sqlUpdate, [hashedPassword, id], (err, result) => {
              if (err) return res.json({ Status: false, Error: "Update error" });
              return res.json({ Status: true, Message: "Password updated successfully" });
            });
          });
        } else {
          return res.json({ Status: false, Error: "Old password is incorrect" });
        }
      });
    } else {
      return res.json({ Status: false, Error: "Employee not found" });
    }
  });
});


router.put('/updateBio/:id', (req, res) => {
  const id = req.params.id;
  const { bio } = req.body;

  const sql = "UPDATE employee SET bio = ? WHERE id = ?";
  con.query(sql, [bio, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Update error" });
    return res.json({ Status: true, Message: "Bio updated successfully" });
  });
});

router.put('/update/:id', (req, res) => {
  const id = req.params.id;
  const { name, email, salary } = req.body;

  const sql = "UPDATE employee SET name = ?, email = ?, salary = ? WHERE id = ?";
  con.query(sql, [name, email, salary, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Update error" });
    return res.json({ Status: true, Message: "Employee details updated successfully" });
  });
});

export { router as EmployeeRouter }