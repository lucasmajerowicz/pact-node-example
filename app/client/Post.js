class Post {
    constructor(id, date, contents) {
        this.id = id;
        this.date = date;
        this.contents = contents;
    }

    static fromJson(data) {
        return new Post(data.id, data.date, data.contents);
    }

}

module.exports = Post;
