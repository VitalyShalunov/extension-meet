const express = require('express')
const app = express()
const port = 3000


var request = require('request');
var fs = require('fs');


app.get('/', (req, res) => {
    request.post({
        url: 'https://api.remove.bg/v1.0/removebg',
        formData: {
            image_file: fs.createReadStream('original.jpeg'),
            size: 'auto',
        },
        headers: {
            'X-Api-Key': 'VCBWjyjqYyywNy79xBbcEnWN'
        },
        encoding: null
    }, function (error, response, body) {
        if (error) return console.error('Request failed:', error);
        if (response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
        fs.writeFileSync("no-bg.png", body);
    });

    res.send('Hello World!')
})


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

