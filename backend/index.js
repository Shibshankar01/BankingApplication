import express from 'express'
import mysql from 'mysql2'

const app = express()
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"bank"
})

app.use(express.json())

app.get("/", (req, res) => {
    res.json("Hello this is the banking application");
})

app.get("/transactions/:id", (req, res)=>{
    const userId = req.params.id;
    const q = "Select * from account where userId = ?";
    db.query(q, [userId],(err, data)=>{
        if(err){
            return res.json(err);
        }
        return res.json(data)
    })
})

app.get("/users", (req, res) => {
    const q = "select * from users where Role = 'Customer'";
    db.query(q, (err, data)=> {
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.post("/login", (req, res) => {
    const q = "Select * from users where username = ? and password = ?";
    const values = [req.body.username, req.body.password]

    db.query(q, [...values],(err, data)=>{
        if(err) {
            return res.json(err);
        }
        return res.json(data)
    })
})

app.put("/deposit",(req, res)=>{
    const q = "Insert into account (`AccountNumber`, `UserId`, `DepositedAmount`) values (?)";
    const q1 = "Update users set AvailableBalance = ? where Id = ?";
    const values = [req.body.accountNumber, req.body.userId, req.body.depositedAmount]
    const values1 = [req.body.newAvailableBalance, req.body.userId]

    db.query(q, [values], (err, data)=>{
        if(err) return err;
        else{
            db.query(q1, [...values1], (err1, data1)=>{
                if(err1) return err1;
                return res.json(data1);
            })
        }
    })
})

app.put("/withdraw",(req, res)=>{
    const q = "Insert into account (`AccountNumber`, `UserId`, `WithdrawnAmount`) values (?)";
    const q1 = "Update users set AvailableBalance = ? where Id = ?";
    const values = [req.body.accountNumber, req.body.userId, req.body.withdrawnAmount]
    const values1 = [req.body.newAvailableBalance, req.body.userId]

    db.query(q, [values], (err, data)=>{
        if(err) return err;
        else{
            db.query(q1, [...values1], (err1, data1)=>{
                if(err1) return err1;
                return res.json(data1);
            })
        }
    })
})

app.listen(8800, ()=> {
    console.log("Connected to backend1");
})