angular.module('DashBoard')
    .component('teamSettings', {
            templateUrl: 'settings.html',
            controller: teamSettingsCtrl
        }
    )

teamSettingsCtrl.$inject = ['Team', '$stateParams', '$window', 'teamStatusFields'];

function teamSettingsCtrl(Team, $stateParams, $window, teamStatusFields) {
    var vm = this;
    vm.idTeam = $stateParams.id;
    vm.removeTeam = function () {
        Team.delete({id: vm.idTeam}).$promise.then(function () {
            $window.location = '/';
        })
    }
    vm.editStatusFields = function () {
        teamStatusFields(vm.idTeam);
    }
}
