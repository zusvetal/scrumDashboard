angular.module('DashBoard')
    .factory('userService', userService)

userService.$inject = ['token', '$http', 'apiServer'];

function userService(token, $http, apiServer) {
    return {
        logIn: function (username, password) {
            return $http.post(apiServer + '/login', {username: username, password: password});
        },
        logOut: function () {
            token.remove();
        }
    };
}

