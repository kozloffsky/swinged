define(['text!/template/components_registration-form','knockout','app/service/user'], function(tpl, ko, userService) {
    function RegistrationFromComponentVM(){
        this.username = ko.observable().extend({required: true});
        this.password = ko.observable().extend({required: true});
        this.email = ko.observable().extend({required: true});
    }

    RegistrationFromComponentVM.prototype = {
        register:function(){
            userService.signUp(
                this.username(),
                this.password(),
                this.email()
            );
            return false;
        }
    };

    var component = {
        viewModel:RegistrationFromComponentVM,
        template: tpl
    };

    if(!ko.components.isRegistered('registration-form')){
        ko.components.register('registration-form', component);
    }

    return component;
});