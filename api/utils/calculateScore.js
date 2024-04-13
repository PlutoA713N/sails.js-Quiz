// api/utils/calculateScore.js

const calculatePartialScores = (correctAnswers, userAnswers) => {
    const correctCount = correctAnswers.filter(answer => answer.isChecked).length;
    const userCorrectCount = userAnswers.filter(answer => {
        const correctAnswer = correctAnswers.find(a => a.optionName === answer.optionName);
        return correctAnswer && correctAnswer.isChecked && answer.isChecked;
    }).length;


    const ifDefaultOptionValues = userAnswers.filter((answer) => !answer.isChecked).length === userAnswers.length

    const incorrectCount = userAnswers.filter(answer => {
        const correctAnswer = correctAnswers.find(a => a.optionName === answer.optionName);
        return !correctAnswer.isChecked && answer.isChecked;
    }).length;

    let partialScore = userCorrectCount / correctCount;

    // console.log( userCorrectCount, partialScore , incorrectCount )

    if ( !ifDefaultOptionValues && incorrectCount > 0) {
        partialScore -= incorrectCount / correctCount;
    }

    return partialScore;
};

const calculateScore = (quizDocument, userSolution) => {
    let score = 0;

    // console.log(quizDocument, userSolution);

    quizDocument.questions.forEach((question, index) => {

        const eachQuestionAnswers = question.answers;
        const userQuestion = userSolution.questions[index];

        if (userQuestion && userQuestion.answers) {
            const userAnswers = userQuestion.answers;

            const questionsAnswer = eachQuestionAnswers.every((answer, index2) => {
                if(!answer.optionName ){
                    console.log(answer, "ahahah");
                }
                const optionName = answer.optionName;
                const isOptionSelected = answer.isChecked;
                const userOption = userAnswers.find(a => a.optionName === optionName); 

                if (userOption) {
                    const userOptionName = userOption.optionName;
                    const userSelectedOption = userOption.isChecked;

                    return optionName === userOptionName && isOptionSelected === userSelectedOption;
                }
                return false;
            });

            if (questionsAnswer) {
                score += 1;
            } else {
                score += calculatePartialScores(eachQuestionAnswers, userAnswers);
            }
        }
    });

    return score;
};

module.exports = { calculatePartialScores, calculateScore };
