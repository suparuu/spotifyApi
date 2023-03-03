
/* const { default: axios } = require("axios");

export default async function handler(req, res) {
  try {
    const response = await axios.get('http://open.spotify.com/v1/albums/id HTTP/1.1');
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
} */
const accessToken = "YBQBBzatcwkDRKgoIMZ3SBTS-YRx-wDBDt-qHTEY6vHUNDmzpCrK1-dliRXRiMpgK2niEyNLlf3fjQUN";

fetch("https://api.spotify.com/v1/me/playlists", {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error fetching playlists:", error);
  });



const client_id = '017de660e7444fa7a690fd422b198f9f'; // Your client id
const client_secret = 'be4733d60b604cd48b1ae63d424021d4'; // Your secret
const redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri
const response_type = "BQBBzatcwkDRKgoIMZ3SBTS-YRx-wDBDt-qHTEY6vHUNDmzpCrK1-dliRXRiMpgK2niEyNLlf3fjQUN"



/* let aaa = 'http://open.spotify.com/track/6rqhFgbbKwnb9MLmUQDhG6'
console.log(aaa) */

/* fetch('https://api.spotify.com/v1/albums', {
  headers: {
    'Authorization': 'Bearer ' + client_secret
  }
})
.then(response => response.json())
.then(data => {
  console.log(data);
}); */

 // https://api.spotify.com/v1 api의시작    
/* http
  .createServer(function(request, response) {
    response.writeHead(200, { 'Content-Type': 'text/plain' });
    response.write('Hello World');
    response.end();
    console.log('aasd')
  })
  .listen(8888);

  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };
  
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var token = body.access_token;
    }
  }); */

