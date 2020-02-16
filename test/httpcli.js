http = require('http');
const net = require('net');
const url = require('url');

/*
const options = {
    hostname: 'localhost',
    port: 80,
    path: '/',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
};
const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
        console.log('No more data in response.');
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

//req.end();
*/
requestStr = "www.baidu.com";
port = 443;
step = 1;
const client = net.createConnection({ port: 1080 }, () => {
    // 'connect' listener
    console.log('connected to server!');

    //step 1
    step = 1;
    let buf = Buffer.alloc(2);
    buf.write('\u0005\u0000\u0000\u0001', 0, 4, 'binary');
    client.write(buf);
});
client.on('data', (data) => {
    if(step == 1){
        res = data.readUInt16BE(0).toString(16);
        console.log("step 1: " + res);
        if(res == "500"){
            step = 2;

            headByteLen = 4;
            addrLengthByteLen = 1;
            portByteLen = 2;

            reqadr = Buffer.from(requestStr, 'binary');
            reqadrLen = reqadr.length;
            resBuf = Buffer.alloc(5 + reqadrLen + portByteLen);
            //write head
            resBuf.write('\u0005\u0001\u0000\u0003', 'binary');
            //write address length
            resBuf.writeUInt8(reqadrLen, headByteLen);
            //write address
            resBuf.write(requestStr, headByteLen + addrLengthByteLen, reqadrLen, 'binary');
            //write port
            resBuf.writeUInt16BE(port, headByteLen + addrLengthByteLen + reqadrLen);

            console.log("step 2 [buf]: " + resBuf);
            client.write(resBuf);
        }else{
            console.log("step 1 ERROR");
        }
    }else if(step == 2){
        res = data.readUInt16BE(0).toString(16);
        console.log("step 2: " + res);
    }else{
        console.log("step ERROR");
    }
    // client.end();
});
client.on('end', () => {
    console.log('disconnected from server');
});
client.on('error', () => {
    console.log('ERROR from server');
});


// const socket = new net.Socket();
// const port = 1080;
// const hostname = '127.0.0.1';
// socket.setEncoding = 'UTF-8';
// socket.connect( port,hostname,function(){
//     socket.write();
// });
// socket.on( 'data', function ( msg ) {
//     console.log( msg );
// });
// socket.on( 'error', function ( error ) {
//     console.log( 'error [socket]: ' + error );
// });
// socket.on('close',function(){
//     console.log('服务器端下线了');
// });

/*
http.get('http://localhost', (res) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];

    let error;
    if (statusCode !== 200) {
        error = new Error('Request Failed.\n' +
            `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
        error = new Error('Invalid content-type.\n' +
            `Expected application/json but received ${contentType}`);
    }
    if (error) {
        console.error(error.message);
        // consume response data to free up memory
        res.resume();
        return;
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
        try {
            const parsedData = JSON.parse(rawData);
            console.log(parsedData);
        } catch (e) {
            console.error(e.message);
        }
    });
}).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
});
*/
function strToASCII(str){
    var result = [];
    for(var i = 0; i < str.length; i++){
        result.push(str.charCodeAt(i));
    }
    return result;
}
function strToBinary(str){
    var result = [];
    var list = str.split("");
    for(var i=0;i<list.length;i++){
        if(i != 0){
            result.push(" ");
        }
        var item = list[i];
        var binaryStr = item.charCodeAt().toString(2);
        result.push(binaryStr);
    }
    return result.join("");
}

