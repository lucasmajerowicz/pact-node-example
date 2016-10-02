var pact = require('@pact-foundation/pact-node');
var path = require('path');
const PostService = require('../PostService');

var opts = {
    providerBaseUrl: 'http://localhost:8081',
    providerStatesUrl: 'http://localhost:8081/states',
    providerStatesSetupUrl: 'http://localhost:8081/setup',
    pactUrls: [path.resolve(__dirname, '../../../pacts/my_consumer-posts_provider.json')]
};

pact.verifyPacts(opts).then(() => {
    console.log('success');
    process.exit(0);
}).catch((error) => {
    console.log('failed', error);
    process.exit(1);
});