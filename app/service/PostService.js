const PostRepository = require('./PostRepository');
const Post = require('./Post');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const postRepository = new PostRepository();

app.use(bodyParser.json());
app.get('/post/list', function (req, res) {
    const response = {
        posts: postRepository.fetchAll()
    };

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(response));
});

app.get('/post/:postId', function (req, res) {
    const response = {
        post: postRepository.getById(req.params.postId)
    };

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(response));
});

app.get('/states', function (req, res) {
    const response = {
        'My Consumer': ["Has two posts", "Has one post"]
    };

    res.end(JSON.stringify(response));
});

app.post('/setup', function (req, res) {
    const state = req.body.state;

    postRepository.clear();
    switch (state) {
        case 'Has two posts':
            postRepository.insert(new Post(1, '01/10/2016', 'Bla bla bla'));
            postRepository.insert(new Post(2, '01/09/2016', 'Microservice microservice'));
            break;
        case 'Has one post':
            postRepository.insert(new Post(1, '01/08/2016', 'Bla'));
            break;
    }

    res.end();
});


var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
})