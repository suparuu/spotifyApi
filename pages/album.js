import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Album = () => {
  const router = useRouter();
  const token = window.localStorage.token;
  const [tracks, setTracks] = useState();
  const [albumImg, setAlbumImg] = useState();
  
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
      });
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
  return (
    <>
      {tracks &&
        tracks.map((track, i) => {
          console.log(track);
          return (
            <div>
                <img src={albumImg}></img>
              <span>
                {track.name}
                <audio src={track.preview_url} controls></audio>
              </span>
            </div>
          );
        })}
    </>
  );
};

export default Album;
