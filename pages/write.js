import main from "@/styles/main.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import sign from "@/styles/sign.module.css";
import Image from "next/image";

export default function Write() {
  useEffect(() => {
    axios.get(`/api/spotify?id=`).then((res) => {
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
  function goBack(){
    router.back();
  }

  return (
    <>
    <div className={sign.signup}>

        <div className={sign.signupflexbox01}>
        <div className={sign.imgbox}>
            <Image src='./arrowback.svg'
                width={24}
                height={24}
                onClick={()=>{goBack()}}></Image>
        </div>
          <h2 className={sign.textcenter}>회원가입</h2>

      <form onSubmit={signupdata}>
    <div className={sign.helplz}>
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

        </div>
      </div>


      {/* <section className={sign.signup}>
      <div className={sign.imgbox}>
          <Image src='./arrowback.svg'
              width={24}
              height={24}
              onClick={()=>{goBack()}}></Image>
      </div>
      
      <div className={sign.signupflexbox01}>
        <h2 className={sign.textcenter}>로그인</h2>
     <form >
      <div className={sign.helplz}>
        <div className={sign.inputflexbox}>
          <input className={sign.inputborder} placeholder="   이름" name="name"></input>
        </div>
        <div className={sign.inputflexbox}>
          <input className={sign.inputborder} placeholder="   아이디" name="id"></input>
        </div>

          <div className={sign.loginbutton}>
          <input className={sign.signupbutton} style={{background : "#1e1e1e" , color : "#fff" }} type="submit" value="로그인" />
        <input className={sign.signupbutton}
         style={{background : "#d9d9d9"  }}
         type="submit"
         value="이메일로 회원가입"
         onClick={()=>goToWrite()} />
        <input className={sign.signupbutton} type="submit" value="카카오로 시작하기" />
          </div>
          </div>
    </form>
      </div>
      </section> */}
      </>
  );
}
