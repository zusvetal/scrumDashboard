angular.module('DashBoard')
    .component('teamUsers', {
            templateUrl: 'users.html',
            controller: teamUsersCtrl
        }
    );

teamUsersCtrl.$inject = ['User', '$stateParams'];

function teamUsersCtrl(User, $stateParams) {
    var vm = this;

    vm.idTeam = $stateParams.id;
    vm.users=[];
    vm.addTeamMember=addTeamMember;
    vm.editTeamMember=editTeamMember;
    vm.removeTeamMember=removeTeamMember;


    activate();

    //////////////////////////////////////////////////////////////////////////////

    function activate() {
        User.getFromTeam({id:vm.idTeam }).$promise.then(function (users) {
            vm.users=users;
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

    function editTeamMember(index) {
        vm.users[index].edit = (vm.users[index].edit) ? false : true;
    }

    function removeTeamMember(index) {
        var idUser = vm.users[index].id;
        if(confirm('Do you really want to delete team member')){
            User.delete({id: idUser}).$promise.then(function () {
                vm.users.splice(index, 1);
            })
        }
    }
}
