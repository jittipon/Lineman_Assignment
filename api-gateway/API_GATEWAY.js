const axios = require('axios');
const express = require('express');
const app = express();
var cors = require('cors');
app.use(cors());

const API_URL = 'http://localhost:9000/trips';

let data = [];

axios.get(API_URL).then(response => {
    data = response.data;
}).catch(error => {
    console.log(error);
});

app.get('/trips', (req, res) => res.status(200).send(data));

app.get('/trips/:keyword', (req, res) => {
    const keyword = req.params.keyword;
    let item = [];

    data.forEach((e) => {
        if (e.title.includes(keyword)) {
            item.push(e);
        }
        else if (e.description.includes(keyword)) {
            item.push(e);
        }
        else if (e.tags.includes(keyword)) {
            item.push(e);
        }
    });

    if (item.length == 0) {
        return res.status(201).send('not found');
    } else {
        res.status(200).send(item);
    }

});

const PORT = 7000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));