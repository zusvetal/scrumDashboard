angular.module('DashBoard')
    .component('editUser', {
            bindings: {
                user: '<',
                show: '='
            },
            templateUrl: 'edit_user.html',
            controller: editUserCtrl
        }
    )

editUserCtrl.$inject = [];

function editUserCtrl() {
    var vm = this;

    vm.submit = function (isValid) {
        if (!isValid) return false;

        vm.user.$update().then(function () {
            vm.show = false;
        })
    }
}
