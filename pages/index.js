import Head from "next/head";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import {
  Button,
  Card,
  Container,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { resolve } from "styled-jsx/css";
import Script from "next/script";
import album from "./album";
import { useRouter } from "next/router";

/* import SpotifyPlayer from 'react-spotify-web-playback';
import dynamic from "next/dynamic"; */

export default function Home() {
  const [searchInput, setSearchInput] = useState(""); //검색 state
  const [accessToken, setAccessToken] = useState(""); // 토큰값 계속 불러오는 state
  const [albums, setAlbums] = useState(""); //앨범 api
  const [artist, setArtist] = useState(""); //아티스트 api
  const [artistHref, setArtistHref] = useState("");
const CLIENT_ID = "017de660e7444fa7a690fd422b198f9f"; //내 아이디
  const CLIENT_SECRET = "be4733d60b604cd48b1ae63d424021d4"; //내 비밀번호  
  const mytoken =
    "BQCLTrJ27z8pZQ32VjQaMD7_nyFo6wGLCu3i8VWqukjM2T56Tc7NFYf25BE8V"; //내 토큰
  const router = useRouter();

  useEffect(() => {
    let authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET,
    };
    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then((result) => result.json())
      .then((data) => {
        setAccessToken(data.access_token);
        window.localStorage.token = data.access_token;
      });
  }, []); //api토큰값

  async function search() {

    // 아티스트 ID
    let searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
    let artistID = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        return data.artists.items[0].id;
      });


    let albums = await fetch(
      "https://api.spotify.com/v1/artists/" +
        artistID +
        "/albums" +
        "?include_groups=album,single&market=KR&limit=50",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        setAlbums(data.items);
      }); //해당 아티스트의 모든 앨범 가져오기

   

    let artist = await fetch(
      "https://api.spotify.com/v1/artists/" + artistID,
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "artist");
        setArtist(data);
        setArtistHref(data.href);
      });
  } //검색 함수

  function routeAlbum(album) {
    console.log(album)
    router.push({
      pathname: "./album",
      query: {albumHref : album.href,
    albumImg : album.images[2].url},
    });
  }

  return (
    <>
      <Container>
        <InputGroup className="mb-3" size="lg">
          <FormControl
            placeholder="검색"
            type="input"
            onKeyPress={(e) => {
              if (e.key == "Enter") {
                search();
              }
            }}
            onChange={(e) => setSearchInput(e.target.value)}
          ></FormControl>
          <Button onClick={search}>검색</Button>
        </InputGroup>
      </Container>
      <Container>
        <h2></h2>
      </Container>
      <Container>
        <h2>앨범</h2>
        <Row className="mx-2 row row-cols-4">
          {albums &&
            albums.map((album, i) => {
              return (
                 <Card onClick={() => routeAlbum(album)}> 
                  <Card.Img src={album.images[0].url} />
                  <Card.Body>
                    <Card.Title>{album.name}</Card.Title>
                  </Card.Body>
                </Card>
                  );
            })}
        </Row>
      </Container>

      <Container>
        <h2>아티스트</h2>
        <Row className="mx-2 row row-cols-4">
          <Card>
            <Card.Img src={artist && artist.images[0].url} />
            <Card.Body>
              <Card.Title>{artist && artist.name}</Card.Title>
            </Card.Body>
          </Card>
        </Row>
      </Container>
      <Script src="https://sdk.scdn.co/spotify-player.js" />

    </>
  );
}
