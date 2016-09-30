const PostServiceClient = require('./PostServiceClient');

const postServiceClient = new PostServiceClient('http://localhost:8081');

postServiceClient.getPosts()
    .then((posts) => {
        console.log(posts);
    })
    .catch((error) => {
        console.log(error);
    })
;