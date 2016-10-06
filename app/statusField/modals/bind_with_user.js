angular.module('DashBoard')
    .factory('bindingWithUser',bindingWithUser)

bindingWithUser.$inject=['$uibModal']

function bindingWithUser($uibModal) {
    return function (idCard) {
        var settings = {
            animation: true,
            templateUrl: 'bind_with_user.html',
            controller: 'BindingWithUserCtrl',
            controllerAs: '$ctrl',
            resolve: {
                idCard: function () {
                    return idCard;
                }
            }
        };
        return $uibModal.open(settings).result;
    }
}

bindingWithUserCtrl.$inject=['$scope', '$uibModalInstance', 'idCard', 'Card', 'User']

function bindingWithUserCtrl($scope, $uibModalInstance, idCard, Card, User) {
    var vm=this,
        card = new Card();
    vm.users = User.query();
    vm.cancel = function () {
        $uibModalInstance.dismiss();
    };
    vm.submit = function (user, isvalid) {
        if (isvalid) {
            card.user_id = user.id;
            card.$update({id: idCard}).then(function () {
                    $uibModalInstance.close(user);
                })
        }
    }
}
