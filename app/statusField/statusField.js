angular.module('DashBoard')
    .component('statusField', {
        bindings: {
            id: '<'
        },
        templateUrl: 'statusField.html',
        controller: statusFieldCtrl
    })

statusFieldCtrl.$inject = ['StatusField', 'Card', 'addTaskForm', 'bindingWithUser'];

function statusFieldCtrl(StatusField, Card, addTaskForm, bindingWithUser) {
    var vm = this;

    vm.addibleTask = false;
    vm.addTask = function () {
        addTaskForm(vm.id)
            .then(function (card) {
                vm.cards.push(card);
            })
    };

    activate();

    ////////////////////////////////////////////////////

    function activate() {
        return StatusField.get({id: vm.id}).$promise.then(function (statusField) {
            vm.itemType = statusField.item_type.name;
            vm.cardStyle = statusField.style_class ?
                statusField.style_class.name :
                statusField.item_type.default_style_class;

            if (statusField.name === "BackLog") {
                vm.addibleTask = true;
            }

            angular.extend(vm, statusField);

            vm.statusFieldOption = {
                itemMoved: actionAfterItemMoved
            };
        });
    }

    function cardMoveToStatusField(idDestStatusField, idCard) {
        var card = new Card();
        card.status_field_id = idDestStatusField;
        return card.$update({id: idCard});
    }

    function actionAfterItemMoved(eventObj) {
        var card = eventObj.source.itemScope.card,
            idDestStatusField = eventObj.dest.sortableScope.$parent.$ctrl.id,
            moveFailure = function () {
                eventObj.source.itemScope.sortableScope.insertItem(eventObj.source.index, eventObj.source.itemScope.modelValue);
                eventObj.dest.sortableScope.removeItem(eventObj.dest.index);
            };

        if (vm.name === "BackLog") {
            bindingWithUser(card.id)
                .then(function () {
                    return cardMoveToStatusField(idDestStatusField, card.id)
                },
                function () {
                    moveFailure();
                })
                .then(function () {
                    /*TODO refactor*/
                    window.location.reload();
                })
        } else {
            cardMoveToStatusField(idDestStatusField, card.id);
        }
    }
}