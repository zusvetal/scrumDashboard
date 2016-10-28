angular.module('DashBoard')
    .factory('addTaskForm', addTaskForm)

addTaskForm.$inject = ['$uibModal']

function addTaskForm($uibModal) {
    return function (idStatusField) {
        var settings = {
            animation: true,
            templateUrl: 'add_task_form.html',
            controller: addTaskFormCtrl,
            controllerAs: '$ctrl',
            resolve: {
                idStatusField: function () {
                    return idStatusField;
                }
            }
        };
        return $uibModal.open(settings).result;
    }
}

addTaskFormCtrl.$inject = ['$uibModalInstance', 'idStatusField', 'localCards']

function addTaskFormCtrl($uibModalInstance, idStatusField, localCards) {
    var vm = this;

    vm.newCard = {};

    vm.submit = function (isValid) {
        if (!isValid)  return false;

        vm.newCard.status_field_id = idStatusField;

        localCards.save(vm.newCard).then(function () {
            $uibModalInstance.close(vm.newCard);
            vm.newCard = {}
        });
    }
}

