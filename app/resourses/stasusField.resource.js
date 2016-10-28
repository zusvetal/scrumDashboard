angular.module('DashBoard')
    .factory('StatusField', StatusField);

StatusField.$inject=['$resource', 'apiServer'];

function StatusField($resource, apiServer) {
    return $resource(apiServer + '/statusFields/:id', {id: '@id'}, {
        update: {
            method: 'PUT',
            transformRequest: function (statusField) {
                delete statusField.cards;
                delete statusField.item_type;
                delete statusField.team;
                delete statusField.style_class;
                delete statusField.edit;
                return angular.toJson(statusField);
            }
        },
        getFromTeam:{
            method: 'GET',
            isArray: true,
            url: apiServer + '/statusFields/team/:id',
            transformResponse: function (data) {
                return data.trim() ? angular.fromJson(data):false;
            }
        }
    });
}
