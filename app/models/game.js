import DS from 'ember-data';

export default DS.Model.extend({
    gamePhase: DS.belongsTo('gamePhase'),
    gamePlayers: DS.hasMany('gamePlayer', { async: false }),
    turn: DS.attr('number')
});
