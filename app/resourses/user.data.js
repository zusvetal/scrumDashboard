angular.module('DashBoard')
    .factory('User', User);

User.$inject=['$resource', 'apiServer'];

function User($resource, apiServer) {
    return $resource(apiServer + '/users/:id', {id: '@id'}, {
        update: {
            method: 'PUT'
        },
        getFromTeam:{
            method: 'GET',
            isArray: true,
            url: apiServer + '/users/team/:id',
            transformResponse: function (data) {
                return data.trim() ? angular.fromJson(data):false;
            }
        }
    });
}

