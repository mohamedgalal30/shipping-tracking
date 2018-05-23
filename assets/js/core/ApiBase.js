class ApiBase {
    static currentUrlOrigin = window.location.origin;


    static request(urlPath, options) {
        const headers = new Headers({
            'Content-Type': 'application/json',
        });

        return _request(urlPath, options, headers);
    }
}

export default ApiBase;


// private functions
function _request(urlPath, options, headers) {
    const fullUrlPath = `${ApiBase.currentUrlOrigin}${urlPath}`,
        url = new URL(fullUrlPath);
    let params = options.params;

    options.headers = headers;

    if (params) {
        Object.keys(params)
            .forEach(key => {
                let value = params[key];
                url.searchParams.append(key, value);
            });
        delete options.params;
    }

    if (options.body)
        options.body = JSON.stringify(options.body);

    const request = new Request(url, options);

    return fetch(request)
        .then(_handleErrors);
}

function _handleErrors(response) {
    let json = response.json();
    if (response.status >= 200 && response.status < 300) {
        return json;
    } else {
        return json.then(Promise.reject.bind(Promise));
    }
}