const { calculatePartialScores, calculateScore } = require('../utils/calculateScore');


  module.exports = {

    async createQuiz(req, res) {
      try {
        const quizData = req.body;
  
        const questionsData = quizData.questions.map(question => ({
          questionText: question.questionText,
          answers: question.answers.map(answer => ({
            optionName: answer.optionName,
            isChecked: answer.isChecked
          }))
        }));
  
        const createdQuestions = await Promise.all(questionsData.map(async questionData => {
          const createdQuestion = await Question.create({ questionText: questionData.questionText }).fetch();
          const createdAnswers = await Promise.all(questionData.answers.map(async answerData => {
            const createdAnswer = await Answer.create({
              optionName: answerData.optionName,
              isChecked: answerData.isChecked,
              question: createdQuestion.id
            }).fetch();
            return createdAnswer;
          }));
          await Question.addToCollection(createdQuestion.id, 'answers').members(createdAnswers.map(answer => answer.id));
          return createdQuestion;
        }));
  
        const questionIds = createdQuestions.map(question => question.id);
        const createdQuiz = await Quiz.create({
          title: quizData.title,
          userId: quizData.userId,
          questions: questionIds
        }).fetch();
  
        return res.status(201).json({ message: 'Quiz created successfully!', quiz: createdQuiz });
      } catch (error) {
        console.error('Error creating quiz:', error);
        return res.status(500).json({ message: 'Error creating quiz' });
      }
    },
  
    async findQuizByID(req, res) {
      try {
        const { id } = req.params;
        const foundData = await Quiz.findOne({ id }).populate('questions');
    
        if (!foundData) {
          return res.status(404).json({ error: "Data for the id not found" });
        }
        
        await Promise.all(foundData.questions.map(async (question) => {
          question.answers = await Answer.find({ question: question.id });
        }));
    
        return res.json(foundData);
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    },
    
      


    async addSolutions(req, res) {
      try {
          const { quizId, userId, questions } = req.body;
  
          const userSolution = {
              userId,
              quizId,
              questions: questions.map(question => ({
                  id: question.id,
                  questionText: question.questionText,
                  answers: question.answers
              }))
          };
  
          const quiz = await Quiz.findOne({ id: quizId }).populate('questions');
  
          if (!quiz) {
              return res.status(404).json({ message: 'Quiz not found' });
          }
  
          await Promise.all(quiz.questions.map(async (question) => {
              question.answers = await Answer.find({ question: question.id });
          }));
  
          const score = calculateScore(quiz, userSolution);
          
          try{
            // console.log(QuizResult);
            await QuizResult.create({
                userId,
                score,
                quizId: quiz.id
            }).fetch();
          }catch(err){
            console.log("soomething wrong");
            console.log(err);
          }
          
          return res.status(200).json({ message: 'Solution added successfully', quizId, userId, score });
      } catch (error) {
          console.error('Error adding solutions:', error);
          return res.status(500).json({ message: 'Internal server error' });
      }
  },
  
    

  getResults: async function (req, res) {
    try {
      const results = await QuizResult.find({});
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }


};




