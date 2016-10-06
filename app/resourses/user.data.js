angular.module('DashBoard')
    .factory('User', User);

User.$inject=['$resource', 'apiServer'];

function User($resource, apiServer) {
    return $resource(apiServer + '/users/:id', {id: '@id'}, {
        update: {
            method: 'PUT'
        }
    });
}

