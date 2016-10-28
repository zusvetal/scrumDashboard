angular.module('DashBoard')
    .config(function ($stateProvider) {
        $stateProvider
            .state('team.dashboard', {
                url: '/dashboard',
                template: '<dashboard></dashboard>',
                requiredLogin: true
            })
            .state('team.users', {
                url: '/users',
                template: '<team-users></team-users>',
                requiredLogin: true
            })
            .state('team.settings', {
                url: '/settings',
                template: '<team-settings></team-settings>',
                requiredLogin: true
            })
    })
    .component('team', {
            templateUrl: 'team.html',
            controller: teamCtrl
        }
    )

teamCtrl.$inject = ['$stateParams', 'localTeams'];

function teamCtrl($stateParams, localTeams) {
    var vm = this;

    vm.idTeam = $stateParams.id;
    vm.teams = localTeams.byId;

}