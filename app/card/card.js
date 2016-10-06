angular.module('DashBoard')
    .component('card', {
            bindings: {
                id: '<',
                cardstyle: '<',
                type: '<'
            },
            templateUrl: 'card.html',
            controller: cardCtrl
        }
    );

cardCtrl.$inject = ['Card']

function cardCtrl(Card) {
    var vm = this;

    Card.get({id: vm.id}).$promise.then(function (card) {
        angular.extend(vm, card);
    });
}
