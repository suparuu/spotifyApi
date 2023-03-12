import main from "@/styles/main.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import sign from "@/styles/sign.module.css";
import Image from "next/image";


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
      <form className={sign.signup} onSubmit={signupdata}>
        <div className={sign.signupflexbox01}>
        <div className={sign.imgbox}>
            <Image src='./arrowback.svg'
                width={24}
                height={24}></Image>
        </div>
          <h2 className={sign.textcenter}>회원가입</h2>
          <div className={sign.inputflexbox}>
            <input className={sign.inputborder} placeholder="   이름" name="name"></input>
          </div>
          <div className={sign.inputflexbox}>
            <input className={sign.inputborder} placeholder="   아이디" name="id"></input>
          </div>
          <div className={sign.inputflexbox}>
            <input className={sign.inputborder} placeholder="   비밀번호" name="pw"></input>
          </div>
          <div className={sign.inputflexbox}>
            <input className={sign.inputborder} placeholder="   전화번호" name="tel"></input>
          </div>
          <div className={sign.inputflexbox}>
          <input className={sign.inputbutton} type="submit" value="회원가입" />
          </div>
        </div>
      </form>
    </>
  );
}
