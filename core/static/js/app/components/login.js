define(['text!/template/components_login',
        'knockout',
        'app/service/user',
        'app/components/login-form',
        'app/components/registration-form'],
    function (tpl, ko, userService, loginForm, registrationForm) {


        function LoginComponentViewModel() {

        }

        return {
            viewModel: LoginComponentViewModel,
            template: tpl
        }
    }
);