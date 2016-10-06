angular.module('DashBoard')
    .factory('StatusField', StatusField);

StatusField.$inject=['$resource', 'apiServer'];

function StatusField($resource, apiServer) {
    return $resource(apiServer + '/statusFields/:id', {id: '@id'}, {
        update: {
            method: 'PUT'
        }
    });
}
