angular.module('DashBoard')
    .factory('addMainField', addMainField)

addMainField.$inject = ['StatusField']

function addMainField(StatusField) {
    return function (idTeam) {
        var backLogField = {
                name: 'BackLog',
                team_id: idTeam,
                position: '1',
                item_type_id: '1',
                style_class_id: '4',
                removable: false
            },
            doneField = {
                name: 'Done',
                team_id: idTeam,
                position: '99',
                item_type_id: '2',
                style_class_id: '3',
                removable: false
            };
        return StatusField.save(backLogField).$promise
            .then(function () {
                return StatusField.save(doneField).$promise
            })
    }
}
