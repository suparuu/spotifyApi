import { useRouter } from 'next/router'
import React from 'react'
const AudioCus = () => {
  const router = useRouter();

  console.log(router.pathname,' 플레이어 만들기 실험')

  //String result =   num == 5  ?   c == 'A'?     "num은 5, c는 A"   : "num은 5, c는 A가 아님" : "num은 5가 아님";
  //<div style={{display:router.pathname  ==  '/comp/signup' ? rotuer.pathname == '/' ? 'none':'none :"block"


  return (
    <div style={{display:router.pathname  ==  '/comp/signup' ? router.pathname == '/' ? 'none':'none' :"block" ,
     position : 'fixed', bottom: '0', right: '0' ,zIndex: '99'}}>오디오입니다</div>
    // <div style={{display: 'block',
    //   position : 'fixed', bottom: '0', right: '0' ,zIndex: '99'}}>오디오입니다</div>
  )
}

export default AudioCus