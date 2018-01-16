import DS from 'ember-data';

export default DS.Model.extend({
    userId: DS.attr('number'),
    energy: DS.attr('number'),
    attack: DS.attr('number'),
    health: DS.attr('number'),
    deck: DS.attr('number'),
    hand: DS.hasMany('gameCard', { async: false }),
    // deck: DS.hasMany('gameCard'),
    // permanents: DS.hasMany('gameCard')
});
