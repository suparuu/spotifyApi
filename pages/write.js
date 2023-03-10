import main from "@/styles/main.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Write() {
  useEffect(() => {
    axios.get(`/api/spotify?id=12312331`).then((res) => {
      console.log(res.data);
    });
  }, []);

  function signupdata(e) {
    e.preventDefault();
    let id, pw, name, tel;
    name = e.target.name.value;
    pw = e.target.pw.value;
    id = e.target.id.value;
    tel = e.target.tel.value;

    axios.post("/api/spotify", { name, id, pw, tel });
  }

  return (
    <>
      <form className={main.signup} onSubmit={signupdata}>
        <div className={main.ttt}>
          <h1>회원가입</h1>
          <div className={main.flexbox01}>
            <p>이름</p>
            <input placeholder="이름" name="name"></input>
          </div>
          <div className={main.flexbox01}>
            <p>아이디</p>
            <input placeholder="아이디" name="id"></input>
          </div>
          <div className={main.flexbox01}>
            <p>비밀번호</p>
            <input placeholder="비밀번호" name="pw"></input>
          </div>
          <div className={main.flexbox01}>
            <p>전화번호</p>
            <input placeholder="전화번호" name="tel"></input>
          </div>
          <input type="submit" value="회원가입" />
        </div>
      </form>
    </>
  );
}
