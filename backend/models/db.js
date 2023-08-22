async function connect() {
    if (global.connection) {
      return global.connection;
    }
  
    const { Pool } = require("pg");
  
    const pool = new Pool({
      connectionString: process.env.CONNECTION_STRING
    });
  
    const client = await pool.connect();
    console.log("Conexão estabelecida com sucesso!");
  
    const res = await client.query("SELECT NOW()");
    console.log(res.rows[0]);
  
    client.release();
  
    global.connection = pool;
    return pool;
  }
  
  connect();
  
  async function selectUsers(){
    const client = await connect();
    const res = await client.query("SELECT * FROM users");
    return res.rows;
  }

  async function selectUserById(id){
    const client = await connect();
    const res = await client.query("SELECT * FROM users WHERE Id=$1", [id]);
    return res.rows;
  }

  async function selectUserByInfo(user){
    const client = await connect();
    const res = await client.query("SELECT * FROM users WHERE email=$1 and password=$2", [user.email, user.password]);
    return res.rows;
  }

  async function insertUser(user){
    const client = await connect();
    await client.query("INSERT INTO users(name,surname,email,password,created_at) VALUES ($1,$2,$3,$4,$5)", [user.name, user.surname, user.email, user.password, user.created_at]);
  }

  async function updateUser(id, user) {
    const client = await connect();
    await client.query(
      "UPDATE users SET name=$1, surname=$2, email=$3, password=$4, created_at=$5 WHERE id=$6",
      [user.name, user.surname, user.email, user.password, user.created_at, id]
    );
  }

  async function deleteUser(id) {
    const client = await connect();
    await client.query(
      "DELETE FROM users WHERE id=$1",
      [id]
    );
  }

  async function selectCampaign(id){
    const client = await connect();
    const res = await client.query("SELECT * FROM campaign WHERE id_user=$1", [id]);
    return res.rows;
  }

  async function selectTeam(id){
    const client = await connect();
    const res = await client.query("SELECT * FROM teams WHERE id=$1", [id]);
    return res.rows;
  }

  async function selectPlayers(id){
    const client = await connect();
    const res = await client.query("SELECT * FROM player WHERE id_team=$1", [id]);
    return res.rows;
  }

  async function selectTeams(){
    const client = await connect();
    const res = await client.query("SELECT * FROM teams");
    return res.rows;
  }

  async function selectChampionships(){
    const client = await connect();
    const res = await client.query("SELECT * FROM championship");
    return res.rows;
  }

  async function selectMatches(){
    const client = await connect();
    const res = await client.query("SELECT * FROM match");
    return res.rows;
  }

  async function selectTournamentInfos(id){
    const client = await connect();
    const res = await client.query("SELECT * FROM championshiphasmatches WHERE id_championship=$1", [id]);
    return res.rows;
  }

  async function selectResults(){
    const client = await connect();
    const res = await client.query("SELECT * FROM championshiphasteams ORDER BY wins DESC");
    return res.rows;
  }

  async function results(id, user){
    console.log(id, user)
    const client = await connect();
    await client.query(
      "UPDATE championshiphasteams SET wins=$1, loses=$2 WHERE id_team=$3",
      [user.wins, user.loses, user.id]
    );
  }

  module.exports = {
    selectUsers,
    selectUserById,
    selectUserByInfo,
    updateUser,
    insertUser,
    deleteUser,
    selectCampaign,
    selectTeam,
    selectTeams,
    selectPlayers,
    selectMatches,
    selectChampionships,
    selectTournamentInfos,
    selectResults,
    results
  }