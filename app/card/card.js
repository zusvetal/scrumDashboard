/**
 * Created by vzusko on 9/14/2016.
 */
var cardCtrl=function (Card) {
    var self=this;
    Card.get({id:self.id})
        .$promise
        .then(function(card){
            self.description = card.description;
            self.owner = card.user.name;
        })
}
angular.module('DashBoard')
    .component('card', {
            bindings: {
                id:'<'
            },
            templateUrl: 'card.html',
            controller: cardCtrl
        }
    )
    .factory('Card', ['$resource', 'apiServer', function ($resource, apiServer) {
        return $resource(apiServer + '/cards/:id', {id: '@id'}, {
            update: {
                method: 'PUT'
            }
        });
    }])
