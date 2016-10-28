angular.module('DashBoard')
    .service('localStatusFields', localStatusFields);

localStatusFields.$inject = ['StatusField', '$filter'];

function localStatusFields(StatusField, $filter) {
    var self = this;

    self.byId = {};
    self.byTeam = {};

    self.$promise = StatusField.query().$promise
        .then(function (statusFields) {
            self.statusFields = statusFields;
            statusFields.forEach(function (statusField) {
                addToByTeamField(statusField)
                self.byId[statusField.id] = statusField;
            });

            return self;
        });

    self.getFromTeam = function (idTeam) {
        return $filter('filter')(self.statusFields, {team_id: idTeam}, true)
    };

    self.getById = function (id) {
        var idModified = Number(id);

        return $filter('filter')(self.statusFields, {id: idModified}, true)[0]
    };

    self.save = function (statusField) {

        return StatusField.save(statusField).$promise.then(function (statusField) {
            self.statusFields.push(statusField);
            self.byId[statusField.id] = statusField;
            addToByTeamField(statusField)

            return statusField;
        });
    };

    self.delete = function (statusField) {

        return StatusField.delete({id: statusField.id}).$promise.then(function () {
            self.statusFields = $filter('filter')(self.statusFields, function (value) {
                return value.id !== statusField.id
            });
            self.byTeam[statusField.team_id] = $filter('filter')(self.byTeam[statusField.team_id], function (value) {
                return value.id !== statusField.id
            });
            delete self.byId[statusField.id];
        });
    };

    ////////////////////////////////////////////////////////

    function addToByTeamField(statusField){
        if (!self.byTeam[statusField.team_id]) {
            self.byTeam[statusField.team_id] = [];
        }
        self.byTeam[statusField.team_id].push(statusField);
    }
}


