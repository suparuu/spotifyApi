import { useRouter } from 'next/router'
import React from 'react'
const AudioCus = () => {
  const router = useRouter();

  console.log(router.pathname,' 플레이어 만들기 실험')


  return (
    <div style={{display:router.pathname  ==  '/signup' ?'none' : router.pathname  ==  '/write' ?'none':""}}>login</div>
  )
}

export default AudioCus