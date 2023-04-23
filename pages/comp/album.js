import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import album from "@/styles/album.module.css";
import Image from "next/image";


const Album = () => {
  const testRef = useRef();
  const router = useRouter();

  const [tracks, setTracks] = useState();
  const [albumImg, setAlbumImg] = useState();
  const [clickTrack, setClickTrack] = useState(); //track api 담는 state
  const [changeBtn , setChangeBtn] = useState(null); // start pause buttons change
  useEffect(() => {
    const token = window.localStorage.token;


    let albumTarget = fetch(`${router.query.albumHref}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(data.tracks.items);
        setTracks(data.tracks.items);
      });
    setAlbumImg(router.query.albumImg)
  }, []);//누른 앨범  api , img state 넘기기

  function tracksClick(track) {
    setClickTrack(track.preview_url)
    console.log(track , '트랙이에요')
  }//audio url 넘겨주는 역할

  function clickStart(i){
    setChangeBtn(true)
    console.log(i)
  }//test

  function clickPause(i){
    setChangeBtn(false)
    console.log(i , '?? ')
  }//test

  function buttonTest(i){
    setChangeBtn(i)

  }

  console.log(testRef)

  function goBack() {
    if (router != undefined) {
      router.back();
    }
  }//라우터 뒤로가기 함수
  




  return (
    <>
    <article className={album.mainBox}>
      <div className={album.headerBox}>
      <div className={album.backimgBox}>
      <Image src='../arrowback.svg'
              width={24}
              height={24}
              onClick={() => { goBack && goBack() }}
              alt=''></Image>
      </div>
      </div>
      <div className={album.albumImgbox}>
        <img style={{ width: "100%" , borderRadius : '30px 30px 0 0'}} src={albumImg}></img>
      </div>
      <section className={album.sectionbox}>
        <div className={album.paddingBox}>
          <h2>노래</h2>
          {tracks &&
            tracks.map((track, i) => {
              return (
                <div className={album.tracks} onClick={() => tracksClick(track)} key={i}>
                  <div className={album.numBox}>
                    {i + 1}
                  </div>
                  <div className={album.artistBox}>
                    <span>
                      {track.name}
                    </span>
                    <span>
                      {track.artists.map((obj, i) => {
                        if (i >= 1) {
                          return ` / ${obj.name}`
                        }
                        else {
                          return obj.name
                        }
                      })}
                    </span>
                  </div>
                  <div className={album.startButton} ref={testRef}>
                    
                      {/* changeBtn ? (<img src='../pause.png' alt='일시정지' onClick={()=>clickPause(i)}></img>)
                      :(<img src='../play.png' alt='시작' onClick={()=>clickStart(i) }></img>) */}
                    
                        {/* <img src={changeBtn ? '../pause.png' : '../play.png'} alt={changeBtn ? '일시정지' : '시작'} onClick={()=>buttonTest(i) } key={i}></img> */}
                        <img src={i === changeBtn ? '../pause.png' : '../play.png'} alt={changeBtn ? '일시정지' : '시작'} onClick={()=>buttonTest(i) } key={i}></img>
                  </div>
                </div>
              );
            })}
          <div>
          </div>
          <audio src={clickTrack} className={album.audio} controls autoplay></audio>
        </div>
      </section>
    </article>
    </>
  );
};

export default Album;
