/**
 * User service
 *
 * provide methods wor working with current user
 *
 * user login uses token based authentication
 */
define(['jquery', 'signals', 'app/service/api'], function ($, s, api) {

    function UserService() {
        this.authenticated = new s.Signal();
    }

    UserService.prototype = {
        isAuthenticated: function () {
            return api.isAuthenticated()
        },

        getToken: function () {
            return api.getToken();
        },

        logIn: function (data) {
            var self = this;
            $.ajax({
                url: '/api/login/',
                method: 'post',
                data: {
                    "username": data.email(),
                    "password": data.password(),
                },
                beforeSend: function (request) {
                    request.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
                },

                success: function (data) {
                    console.log(data);
                    token = data.token;
                    this.authenticated.dispatch(token);
                }.bind(self)
            });
        },

        signIn: function (username, password) {
            api.authenticate(username, password).add(function (data) {
                this.authenticated.dispatch();
            }.bind(this));
        },

        signUp: function (username, password, email) {
            api.register(username, password, email).add(function (data) {
                console.log(data);
            })
        }


    };

    return new UserService();
});