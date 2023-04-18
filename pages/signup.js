
import Image from "next/image";
import sign from "@/styles/sign.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";


export default function Signup() {
  const router = useRouter();

  function goToWrite(e) {
    console.log('asd')
    router.push({
      pathname: "./write"
    }
    )
  }//write 페이지로 보내는 함수
  function goBack() {
    router.back();
  }//뒤로가기 함수

  function sendData(e) {
    e.preventDefault()
    console.log(e.target.id.value)
    console.log(e.target.pw.value)
    axios.get('./api/spotify')
      .then(res => {
        console.log(res.data)
        let filterValue = res.data.filter((obj) => obj.id === e.target.id.value)
        console.log(filterValue[0], 'aaa')
        if (filterValue[0] === undefined) {
          alert('id를 확인해주세요 ')
        }//id 를 잘못쳤을시
        else if (filterValue[0].pw != e.target.pw.value) {
          alert('pw를 확인해주세요')
        }//pw 를 잘못쳤을시
        else {
          router.push(`search/${filterValue[0].userID}`)
        }//search로 넘어가면서 id값도 같이 보내주기
      })

  }
  return (

    <section className={sign.signup}>
      <div className={sign.imgbox}>
        <Image src='./arrowback.svg'
          width={24}
          height={24}
          onClick={() => { goBack() }}
          alt=''></Image>
      </div>

      <div className={sign.signupflexbox01}>
        <h2 className={sign.textcenter}>로그인</h2>
        <form onSubmit={sendData}>
          <div className={sign.helplz}>
            <div className={sign.inputflexbox}>
              <input className={sign.inputborder} placeholder="   아이디" name="id"></input>
            </div>
            <div className={sign.inputflexbox}>
              <input className={sign.inputborder} placeholder="   비밀번호" name="pw"></input>
            </div>

            <div className={sign.loginbutton}>
              <input className={sign.signupbutton} style={{ background: "#1e1e1e", color: "#fff" }} type="submit" value="로그인" />
              <input className={sign.signupbutton}
                style={{ background: "#d9d9d9" }}
                type="button"
                value="이메일로 회원가입"
                onClick={() => goToWrite()} />
              <input className={sign.signupbutton} type="button" value="카카오로 시작하기" />
            </div>
          </div>
        </form>
      </div>
    </section>

  )
}