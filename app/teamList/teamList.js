angular.module('DashBoard')
    .config(function ($stateProvider) {
        $stateProvider
            .state('team', {
                url: '/team/:id',
                template: '<team></team>',
                requiredLogin: true
            })
            .state('teamList', {
                url: '/',
                template: '<team-list></team-list>',
                requiredLogin: true
            })
    })
    .component('teamList', {
            templateUrl: 'teamList.html',
            controller: TeamListCtrl
        }
    )


TeamListCtrl.$inject = ['$scope', 'localTeams', 'addTeamForm', 'teamStatusFields'];

function TeamListCtrl($scope, localTeams, addTeamForm, teamStatusFields) {
    var vm = this;

    vm.teams = localTeams;
    vm.addTeam = addTeam;

    ////////////////////////////////////////////

    function addTeam() {
        addTeamForm().then(function (team) {
            return teamStatusFields(team.id);
        })
    }
}