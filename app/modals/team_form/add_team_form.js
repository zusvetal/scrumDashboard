angular.module('DashBoard')
    .factory('addTeamForm', addTeamForm)

addTeamForm.$inject = ['$uibModal']

function addTeamForm($uibModal) {
    return function () {
        var settings = {
            animation: true,
            templateUrl: 'add_team_form.html',
            controller: addTeamFormCtrl,
            controllerAs: '$ctrl'
        };
        return $uibModal.open(settings).result;
    }
}

addTeamFormCtrl.$inject = ['$uibModalInstance', 'localTeams']

function addTeamFormCtrl($uibModalInstance, localTeams) {
    var vm = this;

    vm.newTeam = {};

    vm.submit = function (isValid) {
        if (!isValid) return false;

        localTeams.save(vm.newTeam).then(function (team) {
            $uibModalInstance.close(team);
        });
    }
}

