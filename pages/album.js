import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

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
      {tracks &&
        tracks.map((track, i) => {
          return (
            <div>
                <img src={albumImg}></img>
              <span>
                {track.name}
                {/* <audio src={track.preview_url} controls></audio> */}
                <button onClick={()=>tracksClick(track)}>미리듣기</button>
              </span>
            </div>
          );
        })}
        <audio src={clickTrack} controls></audio>
    </>
  );
};

export default Album;
