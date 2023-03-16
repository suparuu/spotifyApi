import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import main from "@/styles/main.module.css";
import Image from "next/image";

export default function search() {
  const router = useRouter();
  const CLIENT_ID = "017de660e7444fa7a690fd422b198f9f"; //내 아이디
  const CLIENT_SECRET = "be4733d60b604cd48b1ae63d424021d4"; //내 비밀번호
  const [accessToken, setAccessToken] = useState(""); // 토큰값 계속 불러오는 state
  const [albums, setAlbums] = useState(false); //앨범 api
  const [artist, setArtist] = useState(false); //아티스트 api
  const [searchInput, setSearchInput] = useState(false); //검색 state
  const [showContent, setShowContent] = useState(false);

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

  async function searchWhat() {
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
      });

    let artist2 = await fetch(
      "https://api.spotify.com/v1/artists/" +
        artistID +
        "/top-tracks/?market=KR",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "qweqweqweqwqweqwew");
      });
  } //검색 함수

  function routeAlbum(album) {
    console.log(album);
    router.push({
      pathname: "./album",
      query: { albumHref: album.href, albumImg: album.images[1].url },
    });
  } //rotuer 쿼리 앨범 api 보내기

  function handleClick() {
    setShowContent(true);
    

  } //클릭했을때 컨텐츠 보이는 함수

  return (
    <>
      <main className={main.searchMain}>
        
        <section className={main.sectionpadding}>
        { showContent ? ( <div className={main.inputrapper}>
            <Image src="/search.svg" width={24} height={24}></Image>
            <input
              placeholder="아티스트 검색"
              type="input"
              onKeyPress={(e) => {
                if (e.key == "Enter") {
                  searchWhat();
                  handleClick();
                }
              }}
              onChange={(e) => setSearchInput(e.target.value)}
              className={main.inputmain}
            ></input>
          </div>
          ) : (
            <div className={main.searchImgbox} onClick={()=>{handleClick();}}>
            <Image src="/search.svg" width={36} height={36}></Image>
          </div>

          )
         
}

        </section>

        {/* <section className={`main.sectionAni ${showContent ? 'show' : ''}`}> */}
        {albums &&  (
          <section className={main.sectionAlbum}>
            {artist && (
              <Container /* className={main.artist} */>
                <div className={main.artistbox}>
                  <img src={artist.images[0].url} className={main.artistimg} />
                  <p className={main.artistname}>{artist.name}</p>
                </div>
              </Container>
            )}

            <div>
              <h2 className={main.h2margin}>Album</h2>
            </div>
            <div className={main.divgap}>
              {albums.map((album, i) => {
                return (
                  <div
                    className={main.albums}
                    onClick={() => routeAlbum(album)}
                  >
                    <img
                      src={album.images[1].url}
                      className={main.albumImg}
                    ></img>
                    <p className={main.albumname}>{album.name}</p>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
