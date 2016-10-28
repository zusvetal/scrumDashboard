angular.module('DashBoard')
    .factory('Card', getCard);

getCard.$inject = ['$resource', 'apiServer'];

function getCard($resource, apiServer) {
    return $resource(apiServer + '/cards/:id', {id: '@id'}, {
        update: {
            method: 'PUT',
            transformRequest: function (card) {
                delete card.user;
                delete card.status_field;
                return angular.toJson(card);
            }
        },
        getFromStatusField:{
            method: 'GET',
            isArray: true,
            url: apiServer + '/cards/statusField/:id',
            transformResponse: function (data) {
                return data.trim() ? angular.fromJson(data):false;
            }
        }
    });
}
