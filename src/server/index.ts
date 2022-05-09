import * as express from 'express';

import {
    RegisterMovieEndPoints
} from './endpoints/movie/index';

import {
    authenticate
} from "./middlewares";


export async function init() {
    const app = express();
    app.use(express.json());
    app.use(authenticate);
    const port = 3000;

    RegisterMovieEndPoints(app);

    app.listen(port, () => {
        console.log(`Listening on port ${port}`)
    })
}


/*
app.post('/movies', (req, res) => {
    console.log(req.body);
    res.send('Hello World!')
})
*/
// app.get('/movies', (req, res) => {
//     res.json([
//         {
//         Title: "string0",
//         Released: "date0",
//         Genre: "string0",
//         Director: "string0",
//         },
//         {
//             Title: "string1",
//             Released: "date1",
//             Genre: "string1",
//             Director: "string1",
//         },
//     ]);
// })
