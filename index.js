import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index.ejs', { value: null, valueRound: null });
});

app.post('/', async (req, res) => {
    try {
        console.log(req.body);
        const lat = req.body.lat;
        const lng = req.body.lng;
        const response = await axios.get(`https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lng}`, {
            headers: {'x-access-token': 'openuv-63kqrm1lrlgea-io'},
        });
        const uvIndex = response.data.result.uv;
        const round = Math.round(uvIndex);
        console.log('uvIndex: ', uvIndex);
      res.render("index.ejs", {value: uvIndex, valueRound: round});
    } catch (error) {
      console.error('Failed to make request: ', error.message);
      res.render('index.ejs', { value: null, valueRound: null, error: error.message });
    }
  });

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});