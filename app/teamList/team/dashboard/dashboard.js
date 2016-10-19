angular.module('DashBoard')
    .component('dashboard', {
            templateUrl: 'dashboard.html',
            controller: dashboardCtrl
        }
    )

dashboardCtrl.$inject = ['StatusField', '$stateParams'];

function dashboardCtrl(StatusField, $stateParams) {
    var vm = this;

    vm.idTeam=$stateParams.id;

    activate();

    /////////////////////////////////////

    function activate() {
        return StatusField.getFromTeam({id: vm.idTeam}).$promise.then(function (statusFields) {
            vm.statusFields=statusFields;
            console.log(statusFields);
        })
    }
}
