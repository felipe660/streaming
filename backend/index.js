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

app.get("/users/login", async (req, res) => {
    try {
        console.log("Received query parameters:", req.query);
        const user = await db.selectUserInfo(req.query); // Use req.query para obter os parâmetros da consulta
        return res.json(user);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "An error occurred." });
    }
});


// app.get("/users", async (req,res)=>{ 
//     const users = await db.selectUsers();
//     res.json(users);
// })

// app.get("/users/:id", async (req,res)=>{ 
//     const users = await db.selectUserById(req.params.id);
//     res.json(users);
// })

// app.post("/users", async (req,res) => { 
//     await db.insertUser(req.body);
//     return res.status(201).json({ message: "Success", code: 201 })
// })

// app.patch("/users/:id", async (req,res) => { 
//     await db.updateUser(req.params.id, req.body);
//     res.sendStatus(200);
// })

// app.delete("/users/:id", async (req,res) => { 
//     await db.deleteUser(req.params.id);
//     res.sendStatus(204);
// })

app.get("/campaign/:id", async (req, res) => { 
    const campaigns = await db.selectCampaign(req.params.id); 
    res.json(campaigns);
})

app.get("/team/:id", async (req, res) => { 
    const campaigns = await db.selectTeam(req.params.id); 
    res.json(campaigns);
})

app.get("/team/user/:id", async (req, res) => { 
    const campaigns = await db.selectUserTeam(req.params.id); 
    res.json(campaigns);
})

app.get("/team", async (req,res)=>{ 
    const users = await db.selectTeams();
    res.json(users);
})

app.post("/team", async (req,res) => { 
    await db.insertTeam(req.body);
    return res.status(201).json({ message: "Success", code: 201 })
})

app.post("/championship", async (req,res) => { 
    await db.insertChampionships(req.body);
    return res.status(201).json({ message: "Success", code: 201 })
})

app.get("/championship/:id", async (req,res)=>{ 
    const users = await db.selectChampionships(req.params.id);
    res.json(users);
})

app.get("/matches/:id", async (req,res)=>{
    const users = await db.selectMatches(req.params.id);
    res.json(users);
})

app.post("/matches", async (req,res) => { 
    await db.registerMatch(req.body);
    return res.status(201).json({ message: "Success", code: 201 })
})

app.get("/matches/:id", async (req,res)=>{ 
    const users = await db.selectTournamentInfos(req.params.id);
    res.json(users);
})

app.delete("/matches/:id", async (req,res) => { 
    await db.deleteMatch(req.params.id);
    res.sendStatus(204);
})

app.post("/matches/championshihasmatches", async (req,res) => { 
    await db.championshipHasMatches(req.body);
    return res.status(201).json({ message: "Success", code: 201 })
})

app.post("/matches/finishmatches", async (req,res) => { 
    await db.finishMatch(req.body);
    return res.status(201).json({ message: "Success", code: 201 })
})
app.delete("/matches/championshiphasmatches/:id", async (req,res) => { 
    await db.deleteMatchFromChampionship(req.params.id);
    res.sendStatus(204);
})

app.get("/player/:id", async (req, res) => { 
    const campaigns = await db.selectPlayers(req.params.id); 
    res.json(campaigns);
})

app.get("/results", async (req,res)=>{ 
    const users = await db.selectResults();
    res.json(users);
})

app.post("/results/:id", async (req,res) =>{
    await db.results(req.params.id, req.body);
    return res.status(200).json({ message: "Success", code: 200 })
})


app.get("/results/:id", async (req,res) =>{
    const users = await db.selectTeamInfoById(req.params.id);
    res.json(users);
})

// app.post("/results", async (req,res) =>{
//     await db.registerTeam(req.body);
//     return res.status(200).json({ message: "Success", code: 200 })
// })

app.post("/results", async (req,res) =>{
    await db.registerTeam(req.body);
    return res.status(200).json({ message: "Success", code: 200 })
})

app.get("/champions", async (req,res)=>{ 
    const users = await db.selectChampions();
    res.json(users);
})


app.listen(port);

console.log("Backend rodando");
