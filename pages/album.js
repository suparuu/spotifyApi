import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import album from "@/styles/album.module.css";

const Album = () => {
  const router = useRouter();
  const token = window.localStorage.token;
  const [tracks, setTracks] = useState();
  const [albumImg, setAlbumImg] = useState();
  const [clickTrack, setClickTrack] = useState();
  
  /* useEffect(() => {
    let albumTarget = fetch(`${router.query.href}`, {
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
      });실험합니다 ㅠㅠ 
  }, []); */

  //
  useEffect(() => {
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
  }, []);

function tracksClick(track){
setClickTrack(track.preview_url)

}
  return (
    <>
    <div className={album.albumImgbox}>
      <img style={{width : "100%"}} src={albumImg}></img>
    </div>
    <section className={album.sectionbox}>
        <h2>노래</h2>
      {tracks &&
        tracks.map((track, i) => {
          return (
            <div className={album.tracks} onClick={()=>tracksClick(track)}>
              <span>
                {i+1} 
                {track.name}
              </span>
            </div>
          );
        })}
        <audio src={clickTrack} className={album.audio} controls autoplay></audio>
        </section>
    </>
  );
};

export default Album;
