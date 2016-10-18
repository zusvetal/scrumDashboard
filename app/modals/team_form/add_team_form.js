angular.module('DashBoard')
    .factory('addTeamForm',addTeamForm)

addTeamForm.$inject=['$uibModal']

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

addTeamFormCtrl.$inject=['$uibModalInstance','Team']

function addTeamFormCtrl($uibModalInstance, Team) {
    var vm = this,
        team = new Team();

    vm.submit = function (param, isvalid) {
        if (isvalid) {
            team.name = param.name;
            team.$save().then(function (team) {
                    $uibModalInstance.close(team);
                }
            )
        }
    }
}

