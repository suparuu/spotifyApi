import { flushSync } from "react-dom";

const { executeQuery } = require("@/data/db");

export default function handler(req, res) {

    const { method, body, query } = req;

    async function selectplaylistData() {
        let { userLogin } = query;

        let data = await executeQuery('select * from playlist order by userID DESC', [userLogin]);
        res.json(data)

    }

    async function dataUpdate() {
        let { id, userID, name, image, url, artistname, musicname } = body;

        let data = await executeQuery
            ('insert into playlist (id , userID , image , url , artistname , musicname) values(?,?,?,?,?,?)',
                [id, userID, name, image, url, artistname, musicname]);
        res.json(data)
    }


    switch (method) {
        case 'GET': selectplaylistData(); break;
        case 'POST': dataUpdate(); break;
    }

}
