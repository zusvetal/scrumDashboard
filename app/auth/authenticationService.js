angular.module('DashBoard')
    .factory('authenticationService', authenticationService)

authenticationService.$inject = [];

function authenticationService() {
    return {
        isLogged: true
    };
}
