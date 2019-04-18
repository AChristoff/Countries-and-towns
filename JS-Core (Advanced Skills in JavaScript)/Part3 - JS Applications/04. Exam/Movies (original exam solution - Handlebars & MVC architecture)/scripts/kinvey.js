const kinvey = (() => {

    const BASE_URL = 'https://baas.kinvey.com/';
    const APP_KEY = 'kid_Ske7sdiK4';
    const APP_SECRET = '01648cde5f6249419291757697bcf5d7';

    function makeAuth(auth) {
        if (auth === 'basic') {
            return {
                'Authorization': `Basic ${btoa(APP_KEY + ':' + APP_SECRET)}`
            }
        } else {
            return {
                'Authorization': `Kinvey ${sessionStorage.getItem('authtoken')}`
            }
        }
    }

    function makeRequest(method, collection, endpoint, auth) {
        return{
            headers: makeAuth(auth),
            url: BASE_URL + collection + '/' + APP_KEY + '/' +  endpoint,
            method,
        }
    }

    // request functions

    function post(collection, endpoint, auth, data) {
        let request = makeRequest('POST', collection, endpoint, auth);
        request.data = data;
        return $.ajax(request);
    }

    function get(collection, endpoint, auth) {
        return $.ajax(makeRequest('GET', collection, endpoint, auth))
    }

    function update(collection, endpoint, auth, data) {
        let request = makeRequest('PUT', collection, endpoint, auth);
        request.data = data;
        return $.ajax(request);
    }

    function remove(collection, endpoint, auth) {
        return $.ajax(makeRequest('DELETE', collection, endpoint, auth));
    }

    return {
        post,
        get,
        update,
        remove,
    }
})();