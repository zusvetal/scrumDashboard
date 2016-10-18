angular.module('DashBoard')
    .config(function ($stateProvider) {
        $stateProvider
            .state('team.dashboard', {
                url: '/dashboard',
                template: '<dashboard></dashboard>',
            })
            .state('team.users', {
                url: '/users',
                template: '<users></users>',
            })
            .state('team.settings', {
                url: '/settings',
                template: '<team-settings></team-settings>',
            })
    })
    .component('team', {
            templateUrl: 'team.html',
            controller: teamCtrl
        }
    )

teamCtrl.$inject = ['$stateParams'];

function teamCtrl($stateParams) {
    var vm = this;
    vm.id = $stateParams.id;
}