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

  async function selectUserInfo(user){
    const client = await connect();
    const res = await client.query("SELECT * FROM users WHERE email=$1 and password=$2", [user.email, user.password]);
    return res.rows;
  }

  async function insertUser(user){
    const client = await connect();
    await client.query("INSERT INTO users(name,surname,email,password,created_at) VALUES ($1,$2,$3,$4,$5)", [user.name, user.surname, user.email, user.password, user.created_at]);
  }
  async function insertTeam(user){
    const client = await connect();
    await client.query("INSERT INTO teams(name,id_user,is_main_team) VALUES ($1,$2,$3)", [user.name, user.id_user, user.is_main_team]);
  }

  async function insertChampionships(user){
    const client = await connect();
    await client.query("INSERT INTO championship(name,id_user,year) VALUES ($1,$2,$3)", [user.name, user.id_user, user.year]);
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

  async function selectUserTeam(id){
    const client = await connect();
    const res = await client.query("SELECT * FROM teams WHERE id_user=$1", [id]);
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

  async function selectChampionships(id){
    const client = await connect();
    const res = await client.query("SELECT * FROM championship WHERE id_user=$1", [id]);
    return res.rows;
  }
  async function selectChampions(){
    const client = await connect();
    const res = await client.query("SELECT * FROM champion");
    return res.rows;
  }


  async function selectMatches(id){
    const client = await connect();
    const res = await client.query("SELECT * FROM match WHERE id_user=$1", [id]);
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

  async function finishMatch(user){
    const client = await connect();
    await client.query("INSERT INTO finishmatches(blue_gold,blue_kills,blue_team_dice,game_time,id_blue_team,id_championship,id_red_team,red_gold,red_kills,red_team_dice,winner) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)"
    , [user.blue_gold, user.blue_kills, user.blue_team_dice, user.game_time, user.id_blue_team, user.id_championship, user.id_red_team, user.red_gold, user.red_kills, user.red_team_dice, user.winner]);
  }

  async function championshipHasMatches(user){
    const client = await connect();
    await client.query("INSERT INTO championshiphasmatches(id_user, id_championship, id_match) VALUES ($1,$2,$3)"
    , [user.id_user, user.id_championship, user.id]);
  }

  async function registerMatch(user){
    const client = await connect();
    await client.query("INSERT INTO match(id_blue_team, id_red_team,id_championship, id_user) VALUES ($1,$2,$3,$4)"
    , [user.id_blue_team, user.id_red_team, user.id_championship, user.id_user]);
  }

  async function deleteMatch(id) {
    const client = await connect();
    await client.query(
      "DELETE FROM match WHERE id=$1",
      [id]
    );
  }

  async function deleteMatchFromChampionship(id) {
    const client = await connect();
    await client.query(
      "DELETE FROM championshiphasmatches WHERE id_match=$1",
      [id]
    );
  }

  async function selectTeamInfoById(id){
    const client = await connect();
    const res = await client.query("SELECT * FROM championshiphasteams WHERE id_team=$1", [id]);
    return res.rows;
  }

  async function registerTeam(user){
    const client = await connect();
    await client.query("INSERT INTO championshiphasteams(id_team,id_championship,wins,loses) VALUES ($1,$2,$3,$4)", [user.id_team, user.id_championship, 0, 0]);
  }


  module.exports = {
    selectUsers,
    selectUserById,
    selectUserInfo,
    updateUser,
    insertUser,
    championshipHasMatches,
    deleteUser,
    selectUserTeam,
    selectCampaign,
    insertTeam,
    registerTeam,
    selectTeam,
    selectTeams,
    selectPlayers,
    selectMatches,
    selectChampionships,
    selectTournamentInfos,
    selectResults,
    registerMatch,
    results,
    selectTeamInfoById,
    insertChampionships,
    finishMatch,
    deleteMatch,
    deleteMatchFromChampionship,
    selectChampions
  }