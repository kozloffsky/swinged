define(['knockout',
        'jquery',
        'app/service/user',
        'hasher',
        'crossroads',
        'bootstrap',
        "app/routes",
        "knockout.validation",
        "app/service/user",
    "app/service/api"
    ],
    function (ko, $, userSerivice, h, crossroads, b, routes, kv, userService, api) {

        userService.authenticated.add(function (token) {
            h.setHash('profile/1');
        });

        var MainViewModel = function () {
            this.component = ko.observable();
            this.data = ko.observable();
            this.errors = ko.observableArray();

            api.getError().add(function (error) {
                for(var e in error.responseJSON.errors) {
                    this.errors.push({field: e, error:error.responseJSON.errors[e]});
                }
            }.bind(this));
        };

        var vm = new MainViewModel();

        for (var id in routes) {
            var currentRoute = routes[id];
            console.log(currentRoute.component);

            var route = crossroads.addRoute(currentRoute.pattern);
            route.data = currentRoute;

        }

        crossroads.routed.add(function (request, data) {
            console.log(data);
            var component = data.route.data.component;
            if (!ko.components.isRegistered(component)) {
                ko.components.register(component, {require: "app/components/" + component});
            }
            vm.component(component);
            vm.data(data.params)
        })


        //set up history changes handler
        function parseHash(newHash, oldHash) {
            crossroads.parse(newHash)
        };

        h.initialized.add(parseHash);
        h.changed.add(parseHash);
        h.init();

        ko.applyBindings(vm);
        if(!userService.isAuthenticated()){
            h.setHash('login');
        }
    });