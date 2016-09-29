var statusFieldCtrl = function (StatusField, Card, AddTaskForm, BindingWithUser) {
    function cardMoveToStatusField(idDestStatusField, idCard) {
        var card = new Card();
        card.status_field_id = idDestStatusField;
        return card.$update({id: idCard});
    }
    function actionAfterItemMoved (eventObj) {
        var card = eventObj.source.itemScope.card,
            idDestStatusField = eventObj.dest.sortableScope.$parent.$ctrl.id,
            moveSuccess = function () {
            },
            moveFailure = function () {
                eventObj.source.itemScope.sortableScope.insertItem(eventObj.source.index, eventObj.source.itemScope.modelValue);
                eventObj.dest.sortableScope.removeItem(eventObj.dest.index);
            };
        if (self.name === "BackLog") {
            BindingWithUser(card.id)
                .then(
                    function (user) {
                        cardMoveToStatusField(idDestStatusField, card.id)
                            .then(function () {
                                /*TODO refactor*/
                                window.location.reload();
                            })
                    },
                    function () {
                        moveFailure();
                    }
                )
        } else {
            cardMoveToStatusField(idDestStatusField, card.id);
        }
    }
    var self = this,
        defaultCardStyle = "panel-warning",
        backLogCardStyle = "panel-info",
        doneCardStyle = "panel-success";

    self.addTask = function () {
        AddTaskForm(self.id)
            .then(function (card) {
                self.cards.push(card);
            })
    };

    StatusField.get({id: self.id})
        .$promise
        .then(function (statusField) {
            self.name = statusField.name;
            self.cards = statusField.cards;
            self.cardStyle = defaultCardStyle;
            self.itemType = 'card';

            if (self.name === "BackLog") {
                self.cardStyle = backLogCardStyle;
                self.itemType = 'task';
                self.addibleTask = true;
            } else if (self.name === "Done") {
                self.cardStyle = doneCardStyle;
            }
            self.statusFieldOption = {
                itemMoved:actionAfterItemMoved
            };
        })
};
angular.module('DashBoard')
    .component('statusField', {
            bindings: {
                id: '<'
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
    .factory('User', ['$resource', 'apiServer', function ($resource, apiServer) {
        return $resource(apiServer + '/users/:id', {id: '@id'}, {
            update: {
                method: 'PUT'
            }
        });
    }])
    .controller('AddTaskFormCtrl', ['$scope', '$uibModalInstance', 'idStatusField', 'Card',
        function ($scope, $uibModalInstance, idStatusField, Card) {
            var card = new Card();
            $scope.submit = function (param, isvalid) {
                if (isvalid) {
                    card.status_field_id = idStatusField;
                    for (var prop in param) {
                        card[prop] = param[prop];
                    }
                    card.$save()
                        .then(
                            function (card) {
                                $uibModalInstance.close(card);
                            }
                        )
                }

            }
        }])
    .factory('AddTaskForm', ['$uibModal', function ($uibModal) {
        return function (idStatusField) {
            var settings = {
                animation: true,
                templateUrl: 'addTaskForm.html',
                controller: 'AddTaskFormCtrl',
                resolve: {
                    idStatusField: function () {
                        return idStatusField;
                    }
                }
            };
            return $uibModal.open(settings).result;
        }
    }])
    .controller('BindingWithUserCtrl', ['$scope', '$uibModalInstance', 'idCard', 'Card', 'User',
        function ($scope, $uibModalInstance, idCard, Card, User) {
            var card = new Card();
            $scope.users = User.query();
            $scope.cancel = function () {
                $uibModalInstance.dismiss();
            };
            $scope.submit = function (user, isvalid) {
                if (isvalid) {
                    card.user_id = user.id;
                    card.$update({id: idCard})
                        .then(function () {
                            $uibModalInstance.close(user);
                        })
                }
            }
        }])
    .factory('BindingWithUser', ['$uibModal', function ($uibModal) {
        return function (idCard) {
            var settings = {
                animation: true,
                templateUrl: 'choosingUser.html',
                controller: 'BindingWithUserCtrl',
                resolve: {
                    idCard: function () {
                        return idCard;
                    }
                }
            };
            return $uibModal.open(settings).result;
        }
    }])

