var teamCtrl = function (Team) {
    var self = this;
    self.$routerOnActivate = function (next) {
        var id = next.params.id;
        Team.get({id: id})
            .$promise
            .then(function (team) {
                angular.extend(self, team)
            })
    };
}
angular.module('DashBoard')
    .component('team', {
            bindings: {
                $router: '<'
            },
            templateUrl: 'team.html',
            controller: teamCtrl
        }
    )
    .factory('Team', ['$resource', 'apiServer', function ($resource, apiServer) {
        return $resource(apiServer + '/teams/:id', {id: '@id'}, {
            update: {
                method: 'PUT'
            }
        });
    }]);
