import main from "@/styles/main.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import sign from "@/styles/sign.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Write() {
  const router = useRouter()
  useEffect(() => {
    axios.get(`/api/spotify`).then((res) => {
      console.log(res.data);
    });
  }, []);//db 연결

  function signupdata(e) {
    e.preventDefault();
    let id, pw, name, tel;
    name = e.target.name.value;
    pw = e.target.pw.value;
    id = e.target.id.value;
    tel = e.target.tel.value;

    axios.post("/api/spotify", { name, id, pw, tel });
    router.push('./signup')
    alert('회원가입이 완료되었습니다!')
  }

  function goBack() {
    if (router != undefined) {
      router.back();
    }
  }//라우터 뒤로가기 함수

  return (
    <>
      <div className={sign.signup}>
        <div className={sign.signupflexbox01}>
          <div className={sign.imgbox}>
            <Image src='../arrowback.svg'
              width={24}
              height={24}
              onClick={() => { goBack && goBack() }}
              alt=''
              style={{cursor : 'pointer'}}></Image>
          </div>
          <h2 className={sign.textcenter}>회원가입</h2>
          <form onSubmit={signupdata}>
            <div className={sign.writeInput}>
              <div className={sign.inputflexbox}>
                <input className={sign.inputborder} placeholder="   이름" name="name"></input>
              </div>
              <div className={sign.inputflexbox}>
                <input className={sign.inputborder} placeholder="   아이디" name="id"></input>
              </div>
              <div className={sign.inputflexbox}>
                <input className={sign.inputborder} placeholder="   비밀번호" type={"password"} name="pw"></input>
              </div>
              <div className={sign.inputflexbox}>
                <input className={sign.inputborder} placeholder="   전화번호" name="tel"></input>
              </div>
              <div className={sign.inputflexbox}>
                <input className={sign.inputbutton} type="submit" value="회원가입" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
