angular.module('DashBoard')
    .component('statusField', {
        bindings: {
            field: '<'
        },
        templateUrl: 'statusField.html',
        controller: statusFieldCtrl
    })

statusFieldCtrl.$inject = ['localStatusFields', 'addTaskForm', 'bindingWithUser', 'localCards'];

function statusFieldCtrl(localStatusFields, addTaskForm, bindingWithUser, localCards) {
    var vm = this;

    vm.addibleTask = false;
    vm.width = getWidthOfField();
    vm.addTask = addTask;
    vm.$onInit = function () {
        vm.itemType = vm.field.item_type.name;

        vm.cardStyle = vm.field.style_class ?
            vm.field.style_class.name :
            vm.field.item_type.default_style_class;

        if (vm.field.name === "BackLog") {
            vm.addibleTask = true;
        }

        localCards.$promise.then(function () {
            if (!localCards.byStatus[vm.field.id]) localCards.byStatus[vm.field.id] = [];
        })

        vm.localCards = localCards;

        vm.statusFieldOption = {
            itemMoved: actionAfterItemMoved
        };
    };

    //////////////////////////////////////////////////////

    function addTask(){
        addTaskForm(vm.field.id);
    }

    function cardMoveToStatusField(idDestStatusField, card) {
        card.status_field_id = idDestStatusField;
        return card.$update({id: card.id});
    }

    function actionAfterItemMoved(eventObj) {
        var card = eventObj.source.itemScope.card,
            idDestStatusField = eventObj.dest.sortableScope.$parent.$ctrl.field.id,
            nameDestStatusField = eventObj.dest.sortableScope.$parent.$ctrl.field.name;

        if(nameDestStatusField === "BackLog") moveFailure();
        if (vm.field.name === "BackLog") {
            bindingWithUser(card)
                .then(function () {
                        return cardMoveToStatusField(idDestStatusField, card)
                    },
                    function () {
                        moveFailure();
                    })
        } else {
            cardMoveToStatusField(idDestStatusField, card);
        }


        ////////////////////////////////////////////////////////

        function moveFailure() {
            eventObj.source.itemScope.sortableScope.insertItem(eventObj.source.index, eventObj.source.itemScope.modelValue);
            eventObj.dest.sortableScope.removeItem(eventObj.dest.index);
        }
    }

    function getWidthOfField() {
        var statusFieldCount = localStatusFields.byTeam[vm.field.team_id].length,
            width = 100 / statusFieldCount;
        return width+'%';
    }
}