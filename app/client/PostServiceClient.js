const request = require('request');
const Post = require('./Post');

class PostServiceClient {

    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    getAllPosts() {
        return new Promise((resolve, reject) => {

            const options = {
                url: this.endpoint + '/post/list',
                headers: {'Accept': 'application/json'}
            };

            request(options, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    const parsedBody = JSON.parse(body);
                    const result = parsedBody.posts.map((data) => Post.fromJson(data));

                    resolve(result);
                } else {
                    reject(error);
                }
            });
        });
    }

    getPostById(postId) {
        return new Promise((resolve, reject) => {

            const options = {
                url: this.endpoint + '/post/' + postId,
                headers: {'Accept': 'application/json'}
            };

            request(options, (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    const parsedBody = JSON.parse(body);
                    const result = Post.fromJson(parsedBody.post);

                    resolve(result);
                } else {
                    reject(error);
                }
            });
        });
    }
}


module.exports = PostServiceClient;
