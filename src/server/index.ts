import * as express from 'express';
import {
    RegisterMovieEndPoints
} from './movie/index';

const app = express();
app.use(express.json());
const port = 3000;

RegisterMovieEndPoints(app);
/*
app.post('/movies', (req, res) => {
    console.log(req.body);
    res.send('Hello World!')
})
*/
app.get('/movies', (req, res) => {
    res.json([
        {
        Title: "string0",
        Released: "date0",
        Genre: "string0",
        Director: "string0",
        },
        {
            Title: "string1",
            Released: "date1",
            Genre: "string1",
            Director: "string1",
        },
    ]);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})