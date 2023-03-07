import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Album = () => {
  const router = useRouter();
  const token = window.localStorage.token;
  const [tracks, setTracks] = useState();

  console.log(router.query.id);
  useEffect(() => {
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
  }, []);

  return (
    <>
      {tracks &&
        tracks.map((track, i) => {
          console.log(track);
          return (
            <div>
              <span>
                {track.name}
                <video src={track.preview_url} controls></video>
              </span>
            </div>
          );
        })}
    </>
  );
};

export default Album;
