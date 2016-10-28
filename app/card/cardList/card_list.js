angular.module('DashBoard')
    .component('cardList', {
            require:{
                parent:'^card'
            },
            templateUrl: 'card_list.html',
            controller: cardListCtrl
        }
    );

cardListCtrl.$inject = ['localCards'];

function cardListCtrl(localCards) {
    var vm = this;

    vm.removeCard= function () {
        localCards.delete(vm.parent.card)
    };
}
