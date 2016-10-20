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

teamCtrl.$inject = ['$stateParams', 'Team'];

function teamCtrl($stateParams, Team) {
    var vm = this,
        idTeam = $stateParams.id;

    vm.team = Team.get({id: idTeam});
}