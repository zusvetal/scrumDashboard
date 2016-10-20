angular.module('DashBoard')
    .factory('tokenInterceptor', tokenInterceptor)

tokenInterceptor.$inject = ['$q', '$window', '$location', 'authenticationService', 'token'];

function tokenInterceptor($q, $window, $location, authenticationService, token) {
    return {
        request: function (config) {
            config.headers = config.headers || {};

            if (token.getBody()) {
                config.headers.Authorization = 'Bearer ' + token.getBody();
            }
            return config;
        },

        requestError: function (rejection) {
            return $q.reject(rejection);
        },

        response: function (response) {
            if (response !== null && response.status === 200 && token.getBody() && !authenticationService.isLogged) {
                authenticationService.isLogged = true;
            }
            return response || $q.when(response);
        },

        /* Revoke client authentication if 401 is received */

        responseError: function (rejection) {
            if (rejection !== null && rejection.status === 401 || rejection.status === -1) {
                token.remove();
                authenticationService.isLogged = false;
                $location.path('/login');
            }
            return $q.reject(rejection);
        }
    };
}


