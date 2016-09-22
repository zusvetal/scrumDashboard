/**
 * Created by vzusko on 9/15/2016.
 */

var statusFieldCtrl = function (StatusField, Card) {
    function cardMoveToStatusField(idStatusField, idCard) {
        var card = new Card();
        card.status_field_id = idStatusField;
        card.$update({id: idCard});
    }
    var self = this;
    StatusField.get({id: self.id})
        .$promise
        .then(function (statusField) {
            self.name = statusField.name;
            self.cards = statusField.cards;
            self.statusFieldOption = {
                itemMoved: function (eventObj) {
                    var card=eventObj.source.itemScope.card;
                    idDestStatusField=eventObj.dest.sortableScope.$parent.$ctrl.id;
                    cardMoveToStatusField(idDestStatusField,card.id);
                },
                dragStart: function (event) {
                },
                dragEnd: function (event) {
                }
            };
        })
}

angular.module('DashBoard')
    .component('statusField', {
            bindings: {
                id:'<'
            },
            templateUrl: 'statusField.html',
            controller: statusFieldCtrl
        }
    )
    .factory('StatusField', ['$resource', 'apiServer', function ($resource, apiServer) {
        return $resource(apiServer + '/statusFields/:id', {id: '@id'}, {
            update: {
                method: 'PUT'
            }
        });
    }])
