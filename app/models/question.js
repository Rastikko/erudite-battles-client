import DS from 'ember-data';

export default DS.Model.extend({
    title: DS.attr('string'),
    correctAnswer: DS.attr('string'),
    category: DS.attr('string'),
    affinity: DS.attr('string'),
    potentialAnswers: DS.attr()
});
