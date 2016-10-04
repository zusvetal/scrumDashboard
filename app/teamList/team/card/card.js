// (function () {
//     'use strict';

angular.module('DashBoard')
    .component('task', {
            bindings: {
                id: '<',
                cardstyle: '<',
                type: '<'
            },
            controller: taskCtrl
        }
    );
listCtrl.$inject = ['Card']
function taskCtrl(Card) {
    var vm = this;

    vm.removeTask = removeTask;

    activate();

    function activate(){
        return Card.get({id: vm.id}).$promise.then(function (card) {
            angular.extend(vm, card);
        });
    }
    function removeTask() {
        return Card.delete({id: self.id}).$promise.then(function () {
            $scope.$ctrl.showTask = false;
        });
    }
}

angular.module('DashBoard')
    .component('list', {
            require:'task',
            templateUrl: 'list.html',
            controller: listCtrl
        }
    );

function listCtrl(){
    this.showTask = true;
}

angular.module('DashBoard')
    .component('card', {
            require:'task',
            templateUrl: 'card.html',
            controller: cardCtrl
        }
    );

function cardCtrl(){
    this.showTask = true;
}


// angular.module('DashBoard')
//     .component('card', {
//             bindings: {
//                 id: '<',
//                 cardstyle: '<',
//                 type: '<'
//             },
//             templateUrl: 'card.html',
//             controller: cardCtrl
//         }
//     );
//
// cardCtrl.$inject = ['$scope', 'Card', '$element', '$compile']
//
// function cardCtrl($scope, Card, $element, $compile) {
//     var self = this,
//         taskTpl = '<div class="task list-group-item list-group-item-info"  ng-class="$ctrl.cardstyle"  ng-if="$ctrl.showTask"> {{$ctrl.description}}' +
//             '<button class="close" ng-click="removeTask()">' +
//             '<span class="glyphicon glyphicon-remove remove"></span>' +
//             '</button>' +
//             '</div>';
//     if (self.type === 'task') {
//         $element.replaceWith($compile(taskTpl)($scope));
//     }
//     $scope.$ctrl.showTask = true;
//     $scope.removeTask = function () {
//         Card.delete({id: self.id}).$promise.then(function () {
//             $scope.$ctrl.showTask = false;
//         });
//     };
//     Card.get({id: self.id}).$promise.then(function (card) {
//         angular.extend(self, card);
//     });
// }






angular.module('DashBoard')
    .factory('Card', getCard);

getCard.$inject = ['$resource', 'apiServer'];

function getCard($resource, apiServer) {
    return $resource(apiServer + '/cards/:id', {id: '@id'}, {
        update: {
            method: 'PUT'
        }
    });
}
// })();
