angular.module('DashBoard')
    .factory('bindingWithUser', bindingWithUser)

bindingWithUser.$inject = ['$uibModal']

function bindingWithUser($uibModal) {
    return function (card) {
        var settings = {
            animation: true,
            templateUrl: 'bind_with_user.html',
            controller: bindingWithUserCtrl,
            controllerAs: '$ctrl',
            resolve: {
                card: function () {
                    return card;
                }
            }
        };
        return $uibModal.open(settings).result;
    }
}

bindingWithUserCtrl.$inject = ['$uibModalInstance', 'localUsers', 'card'];

function bindingWithUserCtrl($uibModalInstance, localUsers, card) {
    var vm = this;

    vm.idTeam = card.status_field.team.id;
    vm.users = localUsers;

    vm.cancel = function () {
        $uibModalInstance.dismiss();
    };

    vm.submit = function (user, isvalid) {
        if (!isvalid) return false;

        card.user_id = user.id;
        card.$update().then(function () {
            $uibModalInstance.close(user);
        });
    }
}
