const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const calculateScore = require('../utils/calculateScore');

module.exports = {

  createQuiz: async function (req, res) {
    try {
      const quizData = req.body;
      if (!quizData) {
        return res.status(400).json('Quiz data is empty');
      }
      const newQuiz = await Quiz.create(quizData);
      res.status(201).json(newQuiz);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  },

  findQuizByID: async function (req, res) {
    try {
      const { id } = req.params;
      const foundData = await Quiz.findByPk(id);
      if (!foundData) {
        return res.status(404).json("Data for the id not found");
      }
      res.json(foundData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  findAllQuizs: async function (req, res) {
    try {
      const data = await Quiz.findAll();
      if (!data || data.length === 0) {
        return res.status(404).json("Data not found");
      }
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  addSolutions: async function (req, res) {
    try {
      const { quizId, userName, questions } = req.body;
      const quiz = await Quiz.findByPk(quizId);
      if (!quiz) {
        return res.status(404).json({ message: 'Quiz not found' });
      }
      const score = calculateScore(quiz, { userName, quizId, questions });
      const obtainedScore = await QuizResult.create({
        userName,
        score,
        quizId: quiz.id
      });
      res.status(200).json({ message: 'Solution added successfully', userName, score });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  getResults: async function (req, res) {
    try {
      const results = await QuizResult.findAll();
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
