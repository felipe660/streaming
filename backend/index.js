require("dotenv").config();

const port = process.env.PORT;

const db = require("./models/db")

const express = require('express');

const app = express();

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

app.post("/users", async (req,res) => { 
    await db.insertUser(req.body);
    res.sendStatus(201);
})

app.patch("/users/:id", async (req,res) => { 
    await db.updateUser(req.params.id, req.body);
    res.sendStatus(200);
})

app.delete("/users/:id", async (req,res) => { 
    await db.deleteUser(req.params.id);
    res.sendStatus(204);
})

app.get("/video", async (req,res)=>{ 
    const videos = await db.selectVideo();
    res.json(videos);
})

app.post("/video", async (req,res) => { 
    await db.insertVideo(req.body);
    res.sendStatus(201);
})

app.get("/video/:id", async (req,res)=>{ 
    const video = await db.selectVideoById(req.params.id);
    res.json(video);
})

app.patch("/video/:id", async (req,res) => { 
    await db.updateVideo(req.params.id, req.body);
    res.sendStatus(200);
})

app.delete("/video/:id", async (req,res) => { 
    await db.deleteVideo(req.params.id);
    res.sendStatus(204);
})

app.get("/user-video", async (req,res)=>{ 
    const videos = await db.selectUserVideo();
    res.json(videos);
})

app.get("/user-video/:id", async (req,res)=>{ 
    const video = await db.selectUserVideoById(req.params.id);
    res.json(video);
})

app.post("/user-video", async (req,res) => { 
    await db.insertUserVideo(req.body);
    res.sendStatus(201);
})

app.patch("/user-video/:id", async (req,res) => { 
    await db.updateUserVideo(req.params.id, req.body);
    res.sendStatus(200);
})

app.delete("/user-video/:id", async (req,res) => { 
    await db.deleteUserVideo(req.params.id);
    res.sendStatus(204);
})

app.listen(port);

console.log("Backend rodando");
