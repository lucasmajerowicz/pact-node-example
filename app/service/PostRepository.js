class PostRepository {

    constructor() {
        this.posts = [];
    }

    fetchAll() {
        return this.posts;
    }

    getById(postId) {
        return this.posts.find((post) => postId == post.id);
    }

    insert(post) {
        this.posts.push(post);
    }

    clear() {
        this.posts = [];
    }
}

module.exports = PostRepository;
