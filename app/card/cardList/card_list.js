angular.module('DashBoard')
    .component('cardList', {
            require:{
                card:'^card'
            },
            templateUrl: 'card_list.html',
            controller: cardListCtrl
        }
    );

cardListCtrl.$inject = ['Card']

function cardListCtrl(Card) {
    var vm = this;
    vm.showTask = true;
    vm.removeTask = function () {
        Card.delete({id: vm.id}).$promise.then(function () {
            vm.showTask = false;
        });
    };
}
