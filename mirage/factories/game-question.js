import { Factory, trait } from 'ember-cli-mirage';

export default Factory.extend({
    turn: 1,
    startDate: 1000000000000,
    endDate: null,
    selectedAnswer: null,
    performance: null,
    question() {
        return {
          id: 1,
          title: "What is sin(90 grade)",
          correctAnswer: "1",
          potentialAnswers: [],
          category: "TRIGONOMETRY",
          subcategory: "LOGIC",
          averageAnswerTime: 20
        }
    },

    isCorrect: trait({
        endDate: 1000000000001,
        selectedAnswer: "1",
        performance: 1
    })
});
