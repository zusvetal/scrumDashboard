var statusFieldCtrl = function (StatusField, Card, AddTaskForm) {
    function cardMoveToStatusField(idDestStatusField, idCard) {
        var card = new Card();
        card.status_field_id = idDestStatusField;
        card.$update({id: idCard});
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
                itemMoved: function (eventObj) {
                    var card = eventObj.source.itemScope.card,
                        idDestStatusField = eventObj.dest.sortableScope.$parent.$ctrl.id,
                        moveSuccess = function () {
                        },
                        moveFailure = function () {
                            eventObj.source.itemScope.sortableScope.insertItem(eventObj.source.index, eventObj.source.itemScope.modelValue);
                            eventObj.dest.sortableScope.removeItem(eventObj.dest.index);
                        };

                    cardMoveToStatusField(idDestStatusField, card.id);
                }
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
    .factory('AddTaskForm', ['$uibModal', 'Card', function ($uibModal, Card) {
        return function (idStatusField) {
            var data,
                settings = {
                    animation: true,
                    templateUrl: 'addTaskForm.html',
                    resolve: {
                        data: function () {
                            return data;
                        }
                    },
                    controller: function ($scope, $uibModalInstance) {
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
                    }
                };
            return $uibModal.open(settings).result;
        }
    }]);

