import mysql from 'mysql'

const con = mysql.createConnection({
    host: "db",  // This should match the service name in the Docker Compose file
    user: "example_user",
    password: "example_password",
    database: "example_db"
});

con.connect(function (err) {
    if (err) {
        console.log("connection error")
    } else {
        console.log("Connected")
    }
})

export default con;

