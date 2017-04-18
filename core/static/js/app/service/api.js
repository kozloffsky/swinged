define(['jquery', 'app/service/user', 'knockout', 'signals','jscookies'], function ($, userService, ko, s, c) {

    var error = new s.Signal();
    var token = undefined;

    function ApiService() {
        token = c.get('swinged_token');
    }

    ApiService.prototype = {

        isAuthenticated: function () {
            return token != undefined
        },

        getToken: function () {
            return token;
        },

        getError: function () {
            return error;
        },

        /**
         * Return cookie value
         * @param string name
         * @returns string
         */
        getCookie: function (name) {
            var cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = $.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        },

        /**
         * Make api call, awaits ko VM or object with observables
         * Data is passed as json, if method is GET then data parameter is omitted
         * @param url
         * @param methos
         * @param data
         */
        call: function (url, method, json, headers) {
            var self = this;
            var success = new s.Signal();

            if(this.isAuthenticated()){
                if (headers == undefined){
                    headers = {};
                }
                headers['Authorization']='Token ' + this.getToken();
            }

            $.ajax({
                url: url,
                type: method,
                dataType: 'json',
                data: json,
                beforeSend: function (request) {
                    request.setRequestHeader("X-CSRFToken", c.get('csrftoken'));
                    if (headers != undefined) {
                        for (var header in headers) {
                            request.setRequestHeader(header, headers[header]);
                        }
                    }
                },

                success: function (data) {
                    success.dispatch(data);
                }.bind(self),

                error: function (e) {
                    error.dispatch(e);
                }.bind(self)
            });

            return success;
        },

        authenticate: function (username, password) {
            var data = {};
            data.username = username;
            data.password = password;
            var success = this.call('/api/login/','POST', data);
            success.add(function (data) {
                token = data.token;
                c.set('swinged_token', token);
            }.bind(this));
            return success;
        },

        register: function(username, password, email){
            var success = this.call('/api/register/', 'POST', {
                username: username,
                password1: password,
                password2: password,
                email: email
            });

            return success;
        }
    };

    return new ApiService();
});