angular.module('DashBoard')
    .config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode(true);
    }])
    .value('$routerRootComponent', 'teamList')
    .component('teamList', {
            $routeConfig: [{path: '/team/:id', name: 'Team', component: 'team'}],
            templateUrl: 'teamList.html',
            controller: 'TeamListCtrl'
        }
    )
    .controller('TeamListCtrl', ['$scope', 'Team', function ($scope, Team) {
        $scope.teams = Team.query();
    }])

