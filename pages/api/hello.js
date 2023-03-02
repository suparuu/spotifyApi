
/* export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
} */

import axios from 'axios';

export async function translateText(text) {
  const url = 'https://openapi.naver.com/v1/papago/n2mt';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'X-Naver-Client-Id': 'YOUR_CLIENT_ID_HERE',
    'X-Naver-Client-Secret': 'YOUR_CLIENT_SECRET_HERE',
  };
  const data = {
    source: 'en',
    target: 'ko',
    text,
  };
  
  const response = await axios.post(url, new URLSearchParams(data), { headers });
  const translatedText = response.data.message.result.translatedText;
  return translatedText;
}
