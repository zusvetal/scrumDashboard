angular.module('DashBoard')
    .component('editUser', {
            bindings: {
                id: '<',
                show: '='
            },
            templateUrl: 'edit_user.html',
            controller: editUserCtrl
        }
    )

editUserCtrl.$inject = ['User'];

function editUserCtrl(User) {
    var vm = this;

    User.get({id: vm.id}).$promise.then(function (user) {
        vm.user = {
            id: user.id,
            name: user.name,
            second_name:user.second_name,
            position:user.position
        };
    })
    vm.submit = function (isvalid) {
        if (!isvalid) return false;

        var user = new User();

        angular.extend(user, vm.user);
        user.$update().then(function (user) {
            vm.show = false;
        })
    }
}
