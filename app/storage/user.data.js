angular.module('DashBoard')
    .service('localUsers', localUsers);

localUsers.$inject = ['User', '$filter'];

function localUsers(User, $filter) {
    var self = this;

    self.byTeam = {};
    self.byId = {};

    self.$promise = User.query().$promise
        .then(function (users) {
            self.users = users;
            users.forEach(function (user) {
                addToByTeamField(user);
                self.byId[user.id] = user;
            });

            return users;
        })

    self.getById = function (id) {
        var idModified = Number(id);

        return $filter('filter')(self.users, {id: idModified}, true)[0];
    };

    self.getFromTeam = function (idTeam) {
        var idModified = String(idTeam);

        return $filter('filter')(self.users, {team_id: idModified}, true)
    };

    self.save = function (user) {

        return User.save(user).$promise.then(function (user) {
            self.users.push(user);
            self.byId[user.id] = user;
            addToByTeamField(user);



            return card;
        });
    };

    self.delete = function (user) {

        return User.delete({id: user.id}).$promise.then(function () {
            self.users = $filter('filter')(self.users, function (value) {return value.id !== user.id});
            self.byTeam[user.team_id] = $filter('filter')(self.byTeam[user.team_id], function (value) {return value.id !== user.id});
            delete self.byId[user.id];
        });
    }

    ///////////////////////////////////

    function addToByTeamField(user){
        if (!self.byTeam[user.team_id]) {
            self.byTeam[user.team_id] = [];
        }
        self.byTeam[user.team_id].push(user);
    }
}
