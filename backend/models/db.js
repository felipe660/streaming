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
    console.log("entrou0");
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

  async function selectVideo(){
    const client = await connect();
    const res = await client.query("SELECT * FROM video");
    return res.rows;
  }

  async function insertVideo(video){
    const client = await connect();
    await client.query("INSERT INTO video (url,name,sub_title,creator,publisher,created_at,publish_at,status,duration,body) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)", [video.url, video.name, video.sub_title, video.creator, video.publisher, video.created_at, video.publish_at,video.status,video.duration,video.body]);
  }

  async function selectVideoById(id){
    const client = await connect();
    const res = await client.query("SELECT * FROM video WHERE Id=$1", [id]);
    return res.rows;
  }

  async function updateVideo(id, video) {
    const client = await connect();
    await client.query(
      "UPDATE video SET url=$1, name=$2, sub_title=$3, creator=$4, publisher=$5, created_at=$6, publish_at=$7, status=$8, duration=$9, body=$10 WHERE id=$11",
      [video.url, video.name, video.sub_title, video.creator, video.publisher, video.created_at, video.publish_at, video.status, video.duration, video.body, id]
    );
  }

  async function deleteVideo(id) {
    const client = await connect();
    await client.query(
      "DELETE FROM video WHERE id=$1",
      [id]
    );
  }

  async function selectUserVideo(){
    const client = await connect();
    const res = await client.query("SELECT * FROM userhasvideos");
    return res.rows;
  }

  async function selectUserVideoById(id){
    const client = await connect();
    const res = await client.query("SELECT * FROM userhasvideos WHERE Id=$1", [id]);
    return res.rows;
  }

  async function insertUserVideo(video){
    const client = await connect();
    await client.query("INSERT INTO userhasvideos (iduser, idvideo) VALUES ($1,$2)", [video.iduser, video.idvideo]);
  }

  async function updateUserVideo(id, video) {
    const client = await connect();
    await client.query(
      "UPDATE userhasvideos SET iduser=$1, idvideo=$2 WHERE id=$3",
      [video.iduser, video.idvideo, id]
    );
  }

  async function deleteUserVideo(id) {
    const client = await connect();
    await client.query(
      "DELETE FROM userhasvideos WHERE id=$1",
      [id]
    );
  }
  

  module.exports = {
    selectUsers,
    selectUserById,
    selectUserByInfo,
    updateUser,
    insertUser,
    deleteUser,
    insertVideo,
    selectVideo,
    selectVideoById,
    updateVideo,
    deleteVideo,
    insertUserVideo,
    selectUserVideo,
    selectUserVideoById,
    updateUserVideo,
    deleteUserVideo
  }