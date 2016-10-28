angular.module('DashBoard')
    .component('cardRegular', {
            require:{
                parent:'^card'
            },
            templateUrl: 'card_regular.html',
            controller: cardRegularCtrl
        }
    );

cardRegularCtrl.$inject = [];

function cardRegularCtrl() {
}