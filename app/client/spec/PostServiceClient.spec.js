const path = require('path');
const chai = require('chai');
const Pact = require('pact');
const chaiAsPromised = require('chai-as-promised');
const wrapper = require('@pact-foundation/pact-node');
const PostServiceClient = require('../PostServiceClient');
const Post = require('../Post');

const expect = chai.expect;

chai.use(chaiAsPromised);

describe('Pact', () => {
    let provider;

    // Configure mock server
    const mockServer = wrapper.createServer({
        port: 1234,
        log: path.resolve(process.cwd(), 'logs', 'mockserver-integration.log'),
        dir: path.resolve(process.cwd(), 'pacts'),
        spec: 2
    });

    // Define expected payloads
    const expectedBodyPostList = {
        posts: [
            {id: 1, date: '01/10/2016', contents: 'Bla bla bla'},
            {id: 2, date: '01/09/2016', contents: 'Microservice microservice'}
        ]
    };

    const expectedBodyPostGet = {
        post: {id: 1, date: '01/08/2016', contents: 'Bla'}
    };

    before((done) => {

        // Start mock server
        mockServer.start().then(() => {
            provider = Pact({consumer: 'My Consumer', provider: 'Posts Provider', port: 1234});

            // Add interactions
            provider.addInteraction({
                state: 'Has two posts',
                uponReceiving: 'a request for all posts',
                withRequest: {
                    method: 'GET',
                    path: '/post/list',
                    headers: {'Accept': 'application/json'}
                },
                willRespondWith: {
                    status: 200,
                    headers: {'Content-Type': 'application/json'},
                    body: expectedBodyPostList
                }
            }).then(() => {
                provider.addInteraction({
                    state: 'Has one post',
                    uponReceiving: 'a request for one post',
                    withRequest: {
                        method: 'GET',
                        path: '/post/1',
                        headers: {'Accept': 'application/json'}
                    },
                    willRespondWith: {
                        status: 200,
                        headers: {'Content-Type': 'application/json'},
                        body: expectedBodyPostGet
                    }
                }).then(() => done())
            })
        })
    });

    // Verify service client works as expected
    it('successfully receives all post', (done) => {
        const postServiceClient = new PostServiceClient('http://localhost:1234');
        const verificationPromise = postServiceClient.getAllPosts();
        const expectedPosts = [
            Post.fromJson(expectedBodyPostList.posts[0]),
            Post.fromJson(expectedBodyPostList.posts[1])
        ];

        expect(verificationPromise).to.eventually.eql(expectedPosts).notify(done);
    });

    it('successfully receives one post', (done) => {
        const postServiceClient = new PostServiceClient('http://localhost:1234');
        const verificationPromise = postServiceClient.getPostById(1);
        const expectedPost = Post.fromJson(expectedBodyPostGet.post);

        expect(verificationPromise).to.eventually.eql(expectedPost).notify(done);
    });

    after(() => {
        // Write pact files
        provider.finalize().then(() => {
            wrapper.removeAllServers()

        })
    });
});