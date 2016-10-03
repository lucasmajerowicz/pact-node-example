#Better Testing of Microservices Using Consumer-Driven Contracts in Node.js
========

### Accompanying blog post [here](http://hecodes.com/2016/10/better-testing-microservices-using-consumer-driven-contracts-node-js/)

## Installation
Clone repository and run

```
npm install
```

## Usage
Run consumer-side tests

```
mocha app/client/spec/PostServiceClient.spec.js
```

Run provider-side tests

```
node app/service/spec/PostService.spec.js
```