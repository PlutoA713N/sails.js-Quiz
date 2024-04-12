// api/utils/calculateScore.js

const calculatePartialScores = (correctAnswers, userAnswers) => {
    const correctCount = correctAnswers.filter(answer => answer.isChecked).length;
    const userCorrectCount = userAnswers.filter(answer => {
        const correctAnswer = correctAnswers.find(a => a.optionName === answer.optionName);
        return correctAnswer && correctAnswer.isChecked && answer.isChecked;
    }).length;

    const incorrectCount = userAnswers.filter(answer => {
        const correctAnswer = correctAnswers.find(a => a.optionName === answer.optionName);
        return !correctAnswer || !correctAnswer.isChecked && answer.isChecked;
    }).length;

    let partialScore = userCorrectCount / correctCount;

    if (incorrectCount > 0) {
        partialScore -= incorrectCount / userAnswers.length;
    }

    return partialScore;
};

const calculateScore = (quizDocument, userSolution) => {
    let score = 0;

    quizDocument.questions.forEach((question, index) => {
        const eachQuestionAnswers = question.answers;
        const userAnswers = userSolution.questions[index].answers;

        const questionsAnswer = eachQuestionAnswers.every((answer, index2) => {
            const optionName = answer.optionName;
            const isOptionSelected = answer.isChecked;
            const userOptionName = userAnswers[index2].optionName;
            const userSelectedOption = userAnswers[index2].isChecked;

            return optionName === userOptionName && isOptionSelected === userSelectedOption;
        });

        if (questionsAnswer) {
            score += 1;
        } else {
            score += calculatePartialScores(eachQuestionAnswers, userAnswers);
        }
    });

    return score;
};

module.exports = calculateScore;
