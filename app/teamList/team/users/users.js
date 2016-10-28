angular.module('DashBoard')
    .component('teamUsers', {
            templateUrl: 'users.html',
            controller: teamUsersCtrl
        }
    );

teamUsersCtrl.$inject = ['localUsers', '$stateParams'];

function teamUsersCtrl(localUsers, $stateParams) {
    var vm = this;

    vm.idTeam = $stateParams.id;
    vm.newUser = {};
    vm.users = {};
    vm.addTeamMember = addTeamMember;
    vm.editTeamMember = editTeamMember;
    vm.removeTeamMember = removeTeamMember;

    vm.$onInit = function () {
        vm.users = localUsers;
    };

    //////////////////////////////////////////////////////////////////////////////


    function addTeamMember(isvalid) {
        if (!isvalid) return false;

        vm.newUser.team_id = vm.idTeam;
        localUsers.save(vm.newUser);

        vm.newUser = {};
    }

    function editTeamMember(user) {
        user.edit = (user.edit) ? false : true;
    }

    function removeTeamMember(user) {

        if(confirm('Do you really want to delete team member')){
            localUsers.delete(user);
        }
    }
}
