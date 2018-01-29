import DS from 'ember-data';

export default DS.Model.extend({
    turn: DS.attr('number'),
    startDate: DS.attr('date'),
    endDate: DS.attr('date'),
    selectedAnswer: DS.attr('string'),
    performance: DS.attr('number'),
    question: DS.belongsTo('question')
});
