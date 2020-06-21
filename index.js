const http = require('http');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const utils = require('./utility');

http.createServer((request, response) => {
    console.log(' request url ', request.url);

    let filePath = '.' + request.url;
    if (filePath == './') {
        filePath = 'index.html';
    }

    let extname = String(path.extname(filePath)).toLowerCase();
    let contentType = 'text/html';

    contentType = utils.mimeTypes[extname] || 'application/octect-stream';

    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
        // Request methods you wish to allow
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        'Access-Control-Allow-Credentials': true,
        /** add other headers as per requirement */
        "Set-Cookie": []
    };
    
    if (request.method === 'OPTIONS') {
        response.writeHead(204, headers);
        response.end();
        return;
    } else if(filePath == "./token"){
        console.log("Token request");
        let token = jwt.sign({ foo: 'bar' }, 'shhhhh');
        const newCookie = utils.createSetCookie({
            name: 'jwtToken.s1.s3',
            value: token,
            httpOnly : 1,
            sameSite : "None"
          });
          headers['Set-Cookie'].push(newCookie);
          response.writeHead(200, headers);
          response.end(JSON.stringify({authToken: token}));
          return;
    }else if(filePath == './cookie'){
        console.log("request.headers.Cookie", request.headers.cookie);
        response.writeHead(200, headers);
        response.end(JSON.stringify({cookie: request.headers.cookie}));
        return;
    }else {
        response.writeHead(200, { 'Content-Type': contentType });
        response.end("<h1>Cache are Cached here</h1>", 'utf-8');
    }
}).listen(4123);
console.log('Server running at http://localhost:4123/');