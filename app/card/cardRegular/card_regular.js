angular.module('DashBoard')
    .component('cardRegular', {
            require:{
                card:'^card'
            },
            templateUrl: 'card_regular.html',
            controller: cardRegularCtrl
        }
    );

cardRegularCtrl.$inject = ['Card']

function cardRegularCtrl(Card) {
    var vm = this;
    vm.showTask = true;
}
