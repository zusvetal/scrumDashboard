angular.module('DashBoard')
    .component('teamSettings', {
            templateUrl: 'settings.html',
            controller: teamSettingsCtrl
        }
    )

teamSettingsCtrl.$inject = ['localTeams', '$stateParams', '$window', 'teamStatusFields'];

function teamSettingsCtrl(localTeams, $stateParams, $window, teamStatusFields) {
    var vm = this;
    vm.idTeam = $stateParams.id;
    vm.removeTeam = function () {
        localTeams.delete(localTeams.byId[vm.idTeam]).then(function () {
            $window.location = '/';
        })
    }
    vm.editStatusFields = function () {
        teamStatusFields(vm.idTeam);
    }
}
