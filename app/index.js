angular.module('DashBoard', ['ngResource', 'ui.router', 'ui.bootstrap', 'as.sortable'])
    .constant('apiServer', 'http://10.46.202.200:999')
    .config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode(true);
    }])
