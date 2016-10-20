angular.module('DashBoard')
    .config(function ($stateProvider) {
        $stateProvider.state('logout', {
            url: '/logout',
            requiredLogin: false
        })
    })
