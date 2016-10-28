angular.module('DashBoard')
    .factory('teamStatusFields', teamStatusFields)

teamStatusFields.$inject = ['$uibModal']

function teamStatusFields($uibModal) {
    return function (idTeam) {
        var settings = {
            animation: true,
            templateUrl: 'team_status_fields.html',
            controller: teamStatusFieldsCtrl,
            controllerAs: '$ctrl',
            resolve: {
                idTeam: function () {
                    return idTeam;
                }
            }
        };
        return $uibModal.open(settings).result;
    }
}

teamStatusFieldsCtrl.$inject = ['$uibModalInstance', 'idTeam', 'addMainField', 'localStatusFields', 'localTeams']

function teamStatusFieldsCtrl($uibModalInstance, idTeam, addMainField, localStatusFields, localTeams) {
    var vm = this;

    vm.field = {};
    vm.statusFields = {};
    vm.idTeam = idTeam;
    vm.statusFields = localStatusFields;
    vm.teams = localTeams;
    vm.addStatusField = addStatusField;
    vm.editStatusField = editStatusField;
    vm.removeStatusField = removeStatusField;
    vm.finishEditStatusFields = finishEditStatusFields;

    vm.$onInit = function () {
        localStatusFields.$promise.then(function () {
            if (!localStatusFields.byTeam[idTeam]) {
                return addMainField(idTeam);
            }

        });
    };

///////////////////////////////////////////

    function addStatusField(isValid) {
        if (!isValid) return false;

        vm.field.team_id = idTeam;
        localStatusFields.save(vm.field);
        vm.field = {};
    }

    function editStatusField(field) {
        field.edit = (field.edit) ? false : true;
    }

    function removeStatusField(field) {
        localStatusFields.delete(field);
    }

    function finishEditStatusFields() {
        $uibModalInstance.close();
    }
}

