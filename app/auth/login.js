angular.module('DashBoard')
    .config(function ($stateProvider) {
        $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'login.html',
            controller: loginCtrl,
            controllerAs: '$ctrl',
            requiredLogin: false
        })
    })

loginCtrl.$inject = ['$location', 'authenticationService', 'userService', 'token'];

function loginCtrl($location, authenticationService, userService, token) {
    var vm = this;

    vm.user = '';
    vm.password = '';

    vm.logIn = function logIn() {
        if (vm.user === undefined && vm.password === undefined) return;

        userService.logIn(vm.user, vm.password)
            .success(function (data) {
                authenticationService.isLogged = true;
                token.add(data.token);
                $location.path('/');
            })
            .error(function (status, data) {
                vm.warning = "User or password is uncorrect"
                console.log(status);
                console.log(data);
            });

    };
}
