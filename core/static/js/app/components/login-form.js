define(['text!/template/components_login-form','knockout','app/service/user'], function(tpl, ko, userService) {
    function LoginFromComponentVM(){
        this.username = ko.observable().extend({required: true});
        this.password = ko.observable().extend({required: true});
    }

    LoginFromComponentVM.prototype = {
        logIn:function(){
            userService.signIn(
                this.username(),
                this.password()
            );
            return false;
        }
    };

    var component = {
        viewModel:LoginFromComponentVM,
        template: tpl
    };

    if(!ko.components.isRegistered('login-form')){
        ko.components.register('login-form', component);
    }
    return component;
});