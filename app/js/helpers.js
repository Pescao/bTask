/**
 * Created by pescao on 10.07.2016.
 */
function isset(el) {
    return el === undefined ? false : (typeof(el) === 'undefined' ? false : el !== null);
}

function ajaxRequest(url, data, requestData, type, noCreds) {
    var post = {};
    if (typeof(type) == 'undefined') {
        type = 'GET';
    }
    if (isset(data) && data) {
        post = data;
    }
    if (isset(requestData) && requestData) {
        post = _.extend(post, {requestData: requestData});
    }
    var opts = {
        url: url,
        dataType: 'json',
        contentType: "application/json",
        type: type,
        data: post,
        error: function(jqXHR, textStatus, errorThrown) {
            switch (jqXHR.status) {
                case 403 :
                    break;
                case 204 :
                case 404 :
                    break;
                default:
                    try {
                        errorThrown = $.parseJSON(jqXHR.responseText);
                        if (errorThrown.type) {
                            errorThrown = errorThrown[errorThrown.type].message;
                        } else {
                            errorThrown = errorThrown.error;
                        }
                        errorThrown = trim(errorThrown.toString());
                    } catch (e) {}
                    if (errorThrown != '') {
                        try {
                            FlashMessage.prototype.showMessage(errorThrown, 'error');
                        } catch (e) {}
                    }
                    break;
            }
            return jqXHR;
        },
        success: function (response, textStatus, jqXHR) {
            response = response || {};
            response.ResponseStatusCode = jqXHR.status;
            return response;
        }
    };

    if (!noCreds) {
        opts.xhrFields = { withCredentials: true };
        opts.crossDomain = true;
    }
    console.log(opts);

    return $.ajax(opts);
}

function ajaxRequestNoCreds(url, data) {
    return ajaxRequest(url, data, undefined, undefined, true);
}

function ajaxPostNoCreds(url, data) {
    return ajaxRequest(url, JSON.stringify(data), undefined, 'POST', true);
}

function ajaxPost(url, data) {
    return ajaxRequest(url, data ? JSON.stringify(data) : false, false, 'POST');
}

function ajaxDelete(url, data) {
    return ajaxRequest(url, data ? JSON.stringify(data) : false, false, 'DELETE');
}

function ajaxPatch(url, data) {
    return ajaxRequest(url, data ? JSON.stringify(data) : false, false, 'PATCH');
}

function ajaxPut(url, data) {
    return ajaxRequest(url, data ? JSON.stringify(data) : false, false, 'PUT');
}

function ajaxFileUpload(url, data, progressCallback) {
    var opts = {
        url: url,
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        type: 'POST',
        context: document.body,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        async: true,
        xhr: function() { // Custom XMLHttpRequest
            var myXhr = $.ajaxSettings.xhr();
            if(myXhr.upload){ // Check if upload property exists
                myXhr.upload.addEventListener('progress', progressCallback, false); // For handling the progress of the upload
            }
            return myXhr;
        },
        error: function(jqXHR, textStatus, errorThrown) {
            switch (jqXHR.status) {
                case 403 :
                    break;
                case 204 :
                case 404 :
                    break;
                default:
                    try {
                        errorThrown = $.parseJSON(jqXHR.responseText);
                        errorThrown = errorThrown[errorThrown.type].message;
                        errorThrown = trim(errorThrown.toString());
                    } catch (e) {}
                    if (errorThrown != '') {
                        try {
                            FlashMessage.prototype.showMessage(errorThrown, 'error');
                        } catch (e) {}
                    }
                    break;
            }
            return jqXHR;
        },
        success: function (response, textStatus, jqXHR) {
            if (!response) {
                response = {};
            }
            response.ResponseStatusCode = jqXHR.status;
            return response;
        }
    };

    return $.ajax(opts);
}

function jsonpRequest(url, data, requestData, type, cache) {
    var post = {};
    if (typeof(cache) == 'undefined') {
        cache = false;
    }
    if (typeof(type) == 'undefined') {
        type = 'GET';
    }
    if (isset(data) && data) {
        post = data;
    }
    if (isset(requestData) && requestData) {
        post = _.extend(post, {requestData: requestData});
    }
    var opts = {
        url: url,
        dataType: 'jsonp',
        context: document.body,
        contentType: "application/json",
        type: type,
        async: true,
        data: post,
        error: function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR, textStatus, errorThrown);
            switch (jqXHR.status) {
                case 403 :
                    break;
                case 404 :
                    try {
                        FlashMessage.prototype.showMessage('Ooops. Something went wrong.', 'error');
                    } catch (e) {}
                    break;
                default:
                    try {
                        errorThrown = jqXHR.responseText;
                        errorThrown = $.parseJSON(errorThrown).error;
                        throw errorThrown;
                    } catch (e){
                        if (e == 'This filter or sort is not supported in this view') {
                            app.vent.trigger("reload:current:grid");
                        }
                    }
                    try {
                        FlashMessage.prototype.showMessage(errorThrown, 'error');
                    } catch (e) {}
                    break;
            }
            ajax_loader_stop();
        },
        success: function (response, textStatus, jqXHR) {
            response.ResponseStatusCode = jqXHR.status;
            return response;
        }
    }

    if (opts.type != 'GET') {
        opts.dataType = 'json';
        opts.processData = false;
    }

    if (cache) {
        var a = document.createElement('a');
        a.href = url;
        opts.cache = true;
        opts.jsonpCallback = 'callback_' + Math.abs((a.pathname + a.search + a.hash + JSON.stringify(post)).hash() + 0);
    }

    return $.ajax(opts);
}

function cachedJsonpRequest(url, data, requestData) {
    return jsonpRequest(url, data, requestData, 'GET', true);
}

function jsonpPost(url, data) {
    return jsonpRequest(url, data ? JSON.stringify(data) : false, false, 'POST');
}

function jsonpDelete(url, data) {
    return jsonpRequest(url, data ? JSON.stringify(data) : false, false, 'DELETE');
}

function jsonpPatch(url, data) {
    return jsonpRequest(url, data ? JSON.stringify(data) : false, false, 'PATCH');
}

function jsonpPut(url, data) {
    return jsonpRequest(url, data ? JSON.stringify(data) : false, false, 'PUT');
}

function collectFormData(form) {
    var result = {};
    $('[name]', form).each(function(i, el){
        result[el.name] = el.value;
    });
    return result;
}