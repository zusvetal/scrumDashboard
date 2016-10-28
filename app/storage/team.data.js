angular.module('DashBoard')
    .service('localTeams', localTeams);

localTeams.$inject = ['Team', '$filter'];

function localTeams(Team, $filter) {
    var self = this;

    self.byId = {};

    self.$promise = Team.query().$promise
        .then(function (teams) {
            self.teams = teams;
            teams.forEach(function (team) {
                self.byId[team.id] = team;
            });

            return teams;
        })

    self.getById = function (id) {
        var idModified = Number(id);

        return $filter('filter')(self.teams, {id: idModified}, true)[0]
    };
    
    self.save = function (newTeam) {

        return Team.save(newTeam).$promise.then(function (team) {
            self.teams.push(team);
            self.byId[team.id] = team;

            return team;
        });
    };

    self.delete = function (team) {

        return Team.delete({id: team.id}).$promise.then(function () {
            self.teams = $filter('filter')(self.teams, function (value) {return value.id !== team.id});
            delete self.byId[team.id];
        });
    }
}



