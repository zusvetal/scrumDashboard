angular.module('DashBoard')
    .component('dashboard', {
            templateUrl: 'dashboard.html',
            controller: dashboardCtrl
        }
    )

dashboardCtrl.$inject = ['Team', '$stateParams'];

function dashboardCtrl(Team, $stateParams) {
    var vm = this;

    vm.idTeam=$stateParams.id;

    activate();

    /////////////////////////////////////

    function activate() {
        return Team.get({id: vm.idTeam}).$promise.then(function (team) {
            angular.extend(vm, team)
        })
    }
}
