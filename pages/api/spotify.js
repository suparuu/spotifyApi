import { executeQuery } from "../../data/db.js";

export default function handler(req, res) {
  const { method, body, query } = req;

  switch (method) {
    case "GET":
      dataGet();
      break;
    case "POST":
      dataCreate();
      break;
    case "PUT":
      dataUpdate();
      break;
    case "DELETE":
      dataDelete();
      break;
  }
  console.log(method);
  // async function dataGet() {
  //   console.log(query);
  //   let data = await executeQuery("select * from member where id = ?", [
  //     query.id,
  //   ]);
  //   res.status(200).json(data);
  // }
  async function dataGet(){
    try{
      let data = await executeQuery("select * from member order by userID DESC" , []);
      res.json(data)
    }catch(err){
      res.send(err);
    }
  }

  async function dataCreate() {
    let { name, id, pw, tel } = body;

    let data = await executeQuery(
      "insert into member (name,id,pw,tel) value (?,?,?,?)",
      [name, id, pw, tel]
    );
    res.status(200).send("가입완료!!!");
  }
}
