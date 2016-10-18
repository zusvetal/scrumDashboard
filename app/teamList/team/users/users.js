angular.module('DashBoard')
    .component('teamUsers', {
            templateUrl: 'users.html',
            controller: teamUsersCtrl
        }
    )

teamUsersCtrl.$inject = ['User', '$stateParams'];

function teamUsersCtrl(User, $stateParams) {
    var vm = this;

    vm.idTeam = $stateParams.id;
    vm.users=[];
    vm.addTeamMember=addTeamMember;

    activate();

    //////////////////////////////////////////////////////////////////////////////

    function activate() {
        User.getFromTeam({id:vm.idTeam }).$promise.then(function (users) {
            vm.users=users;
            console.log(users)
        })
    }

    function addTeamMember(isvalid) {
        if (!isvalid) return false;

        vm.user.team_id = vm.idTeam;
        User.save(vm.user).$promise.then(function (user) {
            vm.users.push(user);
        });

        vm.user = {};
    }
}
