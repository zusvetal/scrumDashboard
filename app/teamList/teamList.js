angular.module('DashBoard')
    .config(['$locationProvider', function ($locationProvider) {
        $locationProvider.html5Mode(true);
    }])
    .value('$routerRootComponent', 'teamList')
    .component('teamList', {
            $routeConfig: [{path: '/team/:id', name: 'Team', component: 'team'}],
            templateUrl: 'teamList.html',
            controller: TeamListCtrl
        }
    )


TeamListCtrl.$inject=['$scope','Team'];

function TeamListCtrl($scope, Team){
    var vm = this;

    vm.teams = Team.query();
}