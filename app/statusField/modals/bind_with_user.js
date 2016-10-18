angular.module('DashBoard')
    .factory('bindingWithUser', bindingWithUser)

bindingWithUser.$inject = ['$uibModal']

function bindingWithUser($uibModal) {
    return function (idCard) {
        var settings = {
            animation: true,
            templateUrl: 'bind_with_user.html',
            controller: bindingWithUserCtrl,
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

bindingWithUserCtrl.$inject = ['$uibModalInstance', 'idCard', 'Card', 'User']

function bindingWithUserCtrl($uibModalInstance, idCard, Card, User) {
    var vm = this,
        card = new Card();

    vm.user = [];
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

    activate();

    //////////////////////////////////////////////////////

    function activate() {
        Card.get({id: idCard}).$promise.then(function (card) {
                var idTeam = card.status_field.team.id;

                vm.users = User.getFromTeam({id: idTeam})
            })
    }

}
