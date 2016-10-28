angular.module('DashBoard')
    .component('dashboard', {
            templateUrl: 'dashboard.html',
            controller: dashboardCtrl
        }
    )

dashboardCtrl.$inject = ['localStatusFields', '$stateParams', 'Card'];

function dashboardCtrl(localStatusFields, $stateParams) {
    var vm = this;

    vm.idTeam = $stateParams.id;

    vm.$onInit = function () {

        localStatusFields.$promise.then(function(){

            vm.statusFields = localStatusFields.getFromTeam(vm.idTeam);
        });
    }

    console.log(localStatusFields);
}

