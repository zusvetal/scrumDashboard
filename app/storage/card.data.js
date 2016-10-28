angular.module('DashBoard')
    .service('localCards', localCards);

localCards.$inject = ['Card', '$filter'];

function localCards(Card, $filter) {
    var self = this;

    self.byStatus = {};
    self.byId = {};

    self.$promise = Card.query().$promise
        .then(function (cards) {
            self.cards = cards;
            cards.forEach(function (card, index) {
                addToByStatusField(card);
                self.byId[card.id] = card;
            });
            return self;
        });

    self.getFromStatusField = function (idStatusField) {
        var id = String(idStatusField);
        return $filter('filter')(self.cards, {status_field_id: id}, true)
    };

    self.getById = function (id) {
        var idModified = Number(id);

        return $filter('filter')(self.cards, {id: idModified}, true)[0]
    };

    self.save = function (newCard) {

        return Card.save(newCard).$promise.then(function (card) {
            self.cards.push(card);
            self.byId[card.id] = card;
            addToByStatusField(card);

            return card;
        });
    };

    self.delete = function (card) {

        return Card.delete({id: card.id}).$promise.then(function () {
            self.cards = $filter('filter')(self.cards, function (value) {return value.id !== card.id});
            self.byStatus[card.status_field_id] = $filter('filter')(self.byStatus[card.status_field_id], function (value) {return value.id !== card.id});
            delete self.byId[card.id];
        });
    }

    ////////////////////////////////////////////////////////

    function addToByStatusField(card){
        if (!self.byStatus[card.status_field_id]) {
            self.byStatus[card.status_field_id] = [];
        }
        self.byStatus[card.status_field_id].push(card);
    }
}


