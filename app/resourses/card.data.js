angular.module('DashBoard')
    .factory('Card', getCard);

getCard.$inject = ['$resource', 'apiServer'];

function getCard($resource, apiServer) {
    return $resource(apiServer + '/cards/:id', {id: '@id'}, {
        update: {
            method: 'PUT'
        }
    });
}
