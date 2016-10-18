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

teamStatusFieldsCtrl.$inject = ['$uibModalInstance', 'StatusField', 'Team', 'idTeam', 'addMainField']

function teamStatusFieldsCtrl($uibModalInstance, StatusField, Team, idTeam, addMainField) {
    var vm = this;

    vm.field = {};
    vm.statusFields = {};
    vm.team = Team.get({id: idTeam});
    vm.addStatusField = addStatusField;
    vm.editStatusField = editStatusField;
    vm.removeStatusField = removeStatusField;
    vm.finishEditStatusFields=finishEditStatusFields;

    activate();

///////////////////////////////////////////
    function activate() {
        StatusField.getFromTeam({id: idTeam}).$promise
            .then(function (statusFields) {
                if (statusFields.length === 0) {
                    return addMainField(idTeam);
                }
                vm.statusFields = statusFields;
            })
            .then(function () {
                return StatusField.getFromTeam({id: idTeam});
            })
            .then(function (statusFields) {
                    vm.statusFields = statusFields;
                }
            )
    }

    function addStatusField(isvalid) {
        if (!isvalid) return false;

        vm.field.team_id = idTeam;
        StatusField.save(vm.field).$promise.then(function (statusField) {
            vm.statusFields.push(statusField);
        });

        vm.field = {};
    }

    function editStatusField(index) {
        vm.statusFields[index].edit = (vm.statusFields[index].edit) ? false : true;
    }

    function removeStatusField(index) {
        var idStatusField = vm.statusFields[index].id;

        StatusField.delete({id: idStatusField}).$promise.then(function () {
            vm.statusFields.splice(index, 1);
        })
    }
    
    function finishEditStatusFields() {
        $uibModalInstance.close();
    }
}

