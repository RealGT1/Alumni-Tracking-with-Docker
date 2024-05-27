import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs'
import multer from "multer";
import path from "path";

const router = express.Router();



router.post("/adminlogin", (req, res) => {
    const sql = "SELECT * from admin Where email = ?";
    con.query(sql, [req.body.email], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" });
        if (result.length > 0) {
            const passwordMatch = bcrypt.compareSync(req.body.password, result[0].password);
            if (passwordMatch) {
                const email = result[0].email;
                const admin_id = result[0].id;
                const admin_name = result[0].name;
                const token = jwt.sign(
                    { role: "admin", email: email, id: admin_id },
                    "jwt_secret_key",
                    { expiresIn: "1d" }
                );
                res.cookie('token', token);
                req.session.admin_id = admin_id;
                req.session.admin_name = admin_name; // Store admin_name in session
                return res.json({ loginStatus: true });
            } else {
                return res.json({ loginStatus: false, Error: "Incorrect email or password. Please try again." });
            }
        } else {
            return res.json({ loginStatus: false, Error: "Incorrect email or password. Please try again." });
        }
    });
});

router.post('/add_admin', (req, res) => {
    const sql = "INSERT INTO admin (name, email, password) VALUES (?, ?, ?)"; // Added name to the SQL query
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return res.json({ Status: false, Error: "Hashing Error" });
        con.query(sql, [req.body.name, req.body.email, hash], (err, result) => { // Added req.body.name to the parameters
            if (err) return res.json({ Status: false, Error: "Query Error" });
            return res.json({ Status: true });
        });
    });
});

router.delete('/delete_admin', (req, res) => {
    const sql = "DELETE FROM admin WHERE email = ?";
    con.query(sql, [req.body.email], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" });
        return res.json({ Status: true });
    });
});

router.get('/admin/id', (req, res) => {
    const admin_id = req.session.admin_id;
    const admin_name = req.session.admin_name; // Get admin_name from session
    if (admin_id) {
        res.json({ Status: true, adminId: admin_id, adminName: admin_name });
    } else {
        res.json({ Status: false, Error: "No admin logged in" });
    }
});

router.post('/add_message', (req, res) => {
    const user_id = req.session.admin_id;
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
router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.post('/add_category', (req, res) => {
    const admin_id = req.session.admin_id;
    console.log('Admin ID:', admin_id);
    const sql = "INSERT INTO category (`name`) VALUES (?)"
    con.query(sql, [req.body.category], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true })
    })
})

// image upload 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})
// end imag eupload 

router.post('/add_employee', upload.single('image'), (req, res) => {
    const sql = `INSERT INTO employee 
    (name,email,password, company,linkedin, batch,image, category_id) 
    VALUES (?)`;
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.company,
            req.body.linkedin,
            req.body.batch,
            req.file.filename,
            req.body.category_id
        ]
        con.query(sql, [values], (err, result) => {
            if (err) return res.json({ Status: false, Error: err })
            return res.json({ Status: true })
        })
    })
})

router.get('/employee', (req, res) => {
    const sql = "SELECT employee.*, category.name AS category_name FROM employee JOIN category ON employee.category_id = category.id";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})
router.get('/employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.put('/edit_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE employee 
        set name = ?, email = ?, batch = ?, linkedin = ?, category_id = ? 
        Where id = ?`
    const values = [
        req.body.name,
        req.body.email,
        req.body.batch,
        req.body.linkedin,
        req.body.category_id
    ]
    con.query(sql, [...values, id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err })
        return res.json({ Status: true, Result: result })
    })
})

router.delete('/delete_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "delete from employee where id = ?"
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/admin_count', (req, res) => {
    const sql = "select count(id) as admin from admin";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err })
        return res.json({ Status: true, Result: result })
    })
})



router.get('/employee_count', (req, res) => {
    const sql = "select count(id) as employee from employee";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err })
        return res.json({ Status: true, Result: result })
    })
})



router.get('/admin_records', (req, res) => {
    const sql = "select * from admin"
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" + err })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/logout', (req, res) => {

    res.clearCookie('token')
    res.clearCookie('connect.sid');
    return res.json({ Status: true })
})



router.post('/add_event', (req, res) => {
    const { name, date, description } = req.body;
    const admin_id = req.session.admin_id; // Retrieve admin_id from session

    // Check if admin_id is null
    if (!admin_id) {
        return res.json({ Status: false, Error: 'Not logged in' });
    }

    // Check if name or date is missing or empty
    if (!name || !date || !description) {
        return res.json({ Status: false, Error: 'Name and date are required' });
    }
    const sql = 'INSERT INTO events (name, date, description, admin_id) VALUES (?, ?, ?, ?)';
    con.query(sql, [name, date, description, admin_id], (err, result) => {
        if (err) {
            console.error('Error adding event:', err);
            return res.json({ Status: false, Error: 'Failed to add event' });
        }
        return res.json({ Status: true });
    });
});

// Delete an event
router.delete('/delete_event/:id', (req, res) => {
    const eventId = req.params.id;
    const sql = 'DELETE FROM events WHERE id = ?';
    con.query(sql, [eventId], (err, result) => {
        if (err) {
            console.error('Error deleting event:', err);
            return res.json({ Status: false, Error: 'Failed to delete event' });
        }
        return res.json({ Status: true });
    });
});

// Fetch all events
router.get('/events', (req, res) => {
    const sql = 'SELECT events.*, admin.name AS admin_name FROM events JOIN admin ON events.admin_id = admin.id';
    con.query(sql, (err, result) => {
        if (err) {
            console.error('Error fetching events:', err);
            return res.json({ Status: false, Error: 'Failed to fetch events' });
        }
        return res.json({ Status: true, Result: result });
    });
});

router.post('/login', async (req, res) => {
    // Authenticate the admin
    const admin = await authenticateAdmin(req.body.username, req.body.password);

    if (admin) {
        console.log('Admin ID:', admin.id);
        // If authentication is successful, send back the admin_id
        return res.json({ Status: true, admin_id: admin.id });
    } else {
        // If authentication fails, send an error message
        return res.json({ Status: false, Error: 'Authentication failed' });
    }
});




export { router as adminRouter };
