angular.module('DashBoard')
    .factory('token', token)

token.$inject = ['$window'];

function token($window) {
    return {
        add: function (token) {
            $window.sessionStorage.token = token;
        },
        remove: function () {
            delete $window.sessionStorage.token;
        },
        getBody: function () {
            return $window.sessionStorage.token
        }
    };
}

