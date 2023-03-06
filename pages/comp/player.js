import React, { useEffect, useState } from 'react'

const player = () => {
    useEffect(() => {
        const [accessToken2, setAccessToken2] = useState('');// 토큰값 계속 불러오는 state

        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
    
        document.body.appendChild(script);

        let authParameters = {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
        }
        fetch('https://accounts.spotify.com/api/token', authParameters)
        .then(result => result.json())
        .then(data => setAccessToken2(data.access_token))
      },[])//api토큰값 
    
        window.onSpotifyWebPlaybackSDKReady = () => {
          const player = new window.Spotify.Player({
            name: "Web Playback SDK",
            getOAuthToken: cb => { cb(accessToken2);},
            volume: 0.5,
          });
    
          player.addListener("ready", ({ device_id }) => {
            console.log("Ready with Device ID", device_id);
          });
    
          player.addListener("not_ready", ({ device_id }) => {
            console.log("Device ID has gone offline", device_id);
          });
          player.addListener("player_state_changed", (state) => {
            if (!state) {
              return;
            }
            console.log("state changed", state);
          });
    
          player.connect();
        };
    }
  return (
    <div>player</div>
  )


export default player