angular.module('DashBoard')
    .factory('addTaskForm',addTaskForm)

addTaskForm.$inject=['$uibModal']

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

addTaskFormCtrl.$inject=['$scope', '$uibModalInstance', 'idStatusField', 'Card']

function addTaskFormCtrl($scope, $uibModalInstance, idStatusField, Card) {
    var vm = this,
        card = new Card();

    vm.submit = function (param, isvalid) {
        if (isvalid) {
            card.status_field_id = idStatusField;
            for (var prop in param) {
                card[prop] = param[prop];
            }
            card.$save().then(function (card) {
                    $uibModalInstance.close(card);
                }
            )
        }
    }
}

