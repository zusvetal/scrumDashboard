var cardCtrl = function ($scope, Card, $element, $compile) {
    var self = this,
        taskTpl = '<div class="task list-group-item list-group-item-info"  ng-class="$ctrl.cardstyle"  ng-if="$ctrl.showTask"> {{$ctrl.description}}' +
            '<button class="close" ng-click="removeTask()">' +
            '<span class="glyphicon glyphicon-remove remove"></span>' +
            '</button>' +
            '</div>';
    if (self.type === 'task') {
        $element.replaceWith($compile(taskTpl)($scope));
    }
    $scope.$ctrl.showTask = true;
    $scope.removeTask = function () {
        Card.delete({id: self.id})
            .$promise
            .then(function () {
                $scope.$ctrl.showTask = false;
            });
    }
    Card.get({id: self.id})
        .$promise
        .then(function (card) {
            angular.extend(self, card);
        });
};
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
    )
    .factory('Card', ['$resource', 'apiServer', function ($resource, apiServer) {
        return $resource(apiServer + '/cards/:id', {id: '@id'}, {
            update: {
                method: 'PUT'
            }
        });
    }]);

