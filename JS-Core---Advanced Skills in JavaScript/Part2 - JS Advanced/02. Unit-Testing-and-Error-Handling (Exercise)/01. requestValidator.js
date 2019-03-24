function validateRequest(request) {

    let validMethod = false;
    let validUri = false;
    let uriRgx = /^([\w.]+)$/g;
    let validVersion = false;
    let validMessage = false;
    let messageRgx = /^([^<>\\&'"]*)$/g;

    if (request.method) {
        if (!methodValidator(request)) {
            printError('Method')
        }
    } else {
        printError('Method')
    }

    if (request.uri) {
        if (!uriValidator(request)) {
            printError('URI')
        }
    } else {
        printError('URI')
    }

    if (request.version) {
        if (!versionValidator(request)) {
            printError('Version')
        }
    } else {
        printError('Version')
    }

    if (request.hasOwnProperty('message')) {
        if (!messageValidator(request)) {
            printError('Message')
        }
    } else {
        printError('Message')
    }

    if (validMethod && validUri && validVersion && validMessage) {
        return request;
    }

    function methodValidator(request) {
        if (request.method === 'GET' ||
            request.method === 'POST' ||
            request.method === 'DELETE' ||
            request.method === 'CONNECT') {
            return validMethod = true;
        }
        return validMethod;
    }

    function uriValidator(request) {
        if (uriRgx.test(request.uri) || request.uri === '*') {
            return validUri = true;
        }
        return validUri;
    }

    function versionValidator(request) {
        if (request.version === 'HTTP/0.9' ||
            request.version === 'HTTP/1.0' ||
            request.version === 'HTTP/1.1' ||
            request.version === 'HTTP/2.0') {
            return validVersion = true;
        }
        return validVersion;
    }

    function messageValidator(request) {
        if (messageRgx.test(request.message)) {
            return validMessage = true;
        }
        return validMessage;
    }
    
    function printError(reason) {
        throw new Error(`Invalid request header: Invalid ${reason}`)
    }
}

let test0 = {
    method: 'GET',
    uri: 'svn.public.catalog',
    version: 'HTTP/1.1',
    message: ''
};
let test1 = {
    method: 'OPTIONS',
    uri: 'git.master',
    version: 'HTTP/1.1',
    message: '-recursive'
};
let test2 = {
    method: 'POST',
    uri: 'home.bash',
    message: 'rm -rf /*'
};

console.log(validateRequest(test0));