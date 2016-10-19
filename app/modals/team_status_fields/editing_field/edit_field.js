angular.module('DashBoard')
    .component('editField', {
            bindings: {
                id: '<',
                show: '='
            },
            templateUrl: 'edit_field.html',
            controller: editFieldCtrl
        }
    )

editFieldCtrl.$inject = ['StatusField'];

function editFieldCtrl(StatusField) {
    var vm = this;

    StatusField.get({id: vm.id}).$promise.then(function (field) {
        vm.field = {
            id: field.id,
            name: field.name,
            position:field.position
        };
        console.log(field);
    })
    vm.submit = function (isvalid) {
        if (!isvalid) return false;

        var field = new StatusField();

        angular.extend(field, vm.field);
        field.$update().then(function (statusField) {
            vm.show = false;
        })
    }
}