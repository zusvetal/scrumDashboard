angular.module('DashBoard')
    .component('team', {
            bindings: {
                $router: '<'
            },
            templateUrl: 'team.html',
            controller: teamCtrl
        }
    )

teamCtrl.$inject=['Team'];

function teamCtrl (Team) {
    var vm = this;
    vm.$routerOnActivate = function (next) {
        var id = next.params.id;
        Team.get({id: id}).$promise.then(function (team) {
                angular.extend(vm, team)
            })
    };
}