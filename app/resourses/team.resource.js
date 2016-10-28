angular.module('DashBoard')
    .factory('Team', Team);

Team.$inject=['$resource', 'apiServer'];

function Team($resource, apiServer) {
    return $resource(apiServer + '/teams/:id', {id: '@id'}, {
        update: {
            method: 'PUT'
        }
    });
}
