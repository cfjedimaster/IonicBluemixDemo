IBM Cloud Code Template
===

Bluemix supports IBM's MobileFirst strategy by allowing you as a mobile developer to quickly incorporate pre-built, managed, and scalable cloud services into your mobile applications without relying on IT involvement. You can focus on building your mobile applications rather than the complexities of managing the back end infrastructure.

When you create a Mobile Cloud Starter application, Bluemix provisions multiple services under a single application context. Your mobile application is given access to the following mobile services: Mobile Application Security, Push, and Mobile Data.

The Mobile Cloud Starter application also contains the default Cloud Code Template which includes following functionalities:

1. Modularized and extensible rest endpoints for calling cloudcode
2. Static file hosting

For more details, please read the code comments in app.js.

##Extend it

IBM Cloud Code Template is running in `node.js` runtime. To develop your own code, open the `app.js` and edit the content with any text
editor. There is no restriction on writing the node code, which means you can use any third party modules available on the web.

###Modularized extension

The cloud code template is using [`express 4.x`](http://expressjs.com/4x/api.html) as the web application framework and [`Router`](http://expressjs.com/4x/api.html#router) api to moduralize REST endpoints. To extend it, you might:

1. Create a `people.js` file and place it under `lib` folder
2. Open the `people.js` file and write a mini express app with `Router` api:

  ```javascript

    var people = require('express').Router();

    people.get('/', function(req, res, next) {
    });

    people.post('/', function(req, res, next) {
    });

    people.put('/', function(req, res, next) {
    });

    people.delete('/', function(req, res, next) {
    });

    module.exports = exports = people;

  ```
3. Map the mini express app you have just created to the cloud code context root in the `app.js`

  ```javascript
    app.use(ibmconfig.getContextRoot(), require('./lib/people.js'));
  ```

##Test it

IBM Cloud Code Template is a standard `node.js` application. You can test it on your local workstation with the Bluemix environment context.

###On local workstation

1. Download and install the [`node.js`](http://nodejs.org/) runtime
2. From the template app directory, run ```npm install --production``` to install the dependent modules
3. From the template app directory, run ```node app.js```
4. The services in template app can be access from  
```
http://localhost:3000/yourapplicationroute/v1/apps/yourapplicationid/*
```
For example, static file can be access at
```
http://localhost:3000/yourapplicationroute/v1/apps/yourapplicationid/public
```


###Running with Bluemix environment context

To be able to test your application locally with Bluemix environment context, you need to:

1. Create a Mobile Cloud Starter application on Bluemix with name `cloudcodetest`
2. Download and install the [`Cloud Foundry CLI`](https://github.com/cloudfoundry/cli)
3. Run `cf login` to log into your Bluemix orgnization and space where your Bluemix application is located
4. Create or download the `manifest.yml` and place it with `app.js`. The `manifest.yml` should look like:

  ```yaml
    applications:
    - services:
      - testnewmab:MAS
      - testnewmab:Push
      - testnewmab:MobileData
      disk_quota: 1024M
      host: cloudcodetest
      name: cloudcodetest
      command: node app.js
      path: .
      domain: mybluemix.net
      instances: 1
      memory: 128M
  ```

5. Then run `node app.js` to start your application. The Bluemix environment context for application `cloudcodetest` will be automatically retrieved and added to your application.


##Debug cloud code

1. Download and install [`node-inspector`](https://github.com/node-inspector/node-inspector) as a global module
2. From the template app directory, run ```node-debug app.js```

##Deploy to Bluemix

1. Download and install the [`Cloud Foundry CLI`](https://github.com/cloudfoundry/cli)
2. From the template app directory, run ```cf push ${yourAppName}``` to deploy the app to Bluemix.
3. The services in template app can be access from ```
```
http://${yourAppHost}.mybluemix.net/${yourAppHost}/v1/apps/${applicationId}/*
```
For example, static file can be access at
```
http://cloudcodetest.mybluemix.net/cloudcodetest/v1/apps/33819e7d-31b3-4108-9f6a-18b117919512/public
```
