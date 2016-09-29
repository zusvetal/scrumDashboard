var teamCtrl=function(Team){
    var self=this;
    Team.get({id: self.id})
        .$promise
        .then(function (team) {
            angular.extend(self,team)
        })
}
angular.module('DashBoard')
    .component('team', {
            bindings: {
                id: '<'
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
