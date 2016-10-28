angular.module('DashBoard')
    .component('editField', {
            bindings: {
                field: '<',
                show: '='
            },
            templateUrl: 'edit_field.html',
            controller: editFieldCtrl
        }
    )

editFieldCtrl.$inject = [];

function editFieldCtrl() {
    var vm = this;

    vm.submit = function (isValid) {
        if (!isValid) return false;

        vm.field.$update().then(function () {
            vm.show = false;
        })
    };
}