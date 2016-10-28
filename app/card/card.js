angular.module('DashBoard')
    .component('card', {
            bindings: {
                cardstyle: '<',
                type: '<',
                card: '='
            },
            templateUrl: 'card.html'
        }
    );