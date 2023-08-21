require("dotenv").config();

const port = process.env.PORT;

const db = require("./models/db")

const express = require('express');

const cors = require('cors')

const app = express();

app.use(cors())
 
app.use(express.json());


app.get("/", async (req, res ) =>{
    res.json({
        message: "Funcionando"
    })
});

app.get("/users", async (req,res)=>{ 
    const users = await db.selectUsers();
    res.json(users);
})

app.get("/users/:id", async (req,res)=>{ 
    const users = await db.selectUserById(req.params.id);
    res.json(users);
})

app.post("/users/login", async (req,res)=>{ 
    const user = await db.selectUserByInfo(req.body);
    return res.json(user);
})

app.post("/users", async (req,res) => { 
    await db.insertUser(req.body);
    return res.status(201).json({ message: "Success", code: 201 })
})

app.patch("/users/:id", async (req,res) => { 
    await db.updateUser(req.params.id, req.body);
    res.sendStatus(200);
})

app.delete("/users/:id", async (req,res) => { 
    await db.deleteUser(req.params.id);
    res.sendStatus(204);
})

app.get("/campaign/:id", async (req, res) => { 
    const campaigns = await db.selectCampaign(req.params.id); 
    res.json(campaigns);
})

app.get("/team/:id", async (req, res) => { 
    const campaigns = await db.selectTeam(req.params.id); 
    res.json(campaigns);
})

app.get("/player/:id", async (req, res) => { 
    const campaigns = await db.selectPlayers(req.params.id); 
    res.json(campaigns);
})

app.listen(port);

console.log("Backend rodando");
