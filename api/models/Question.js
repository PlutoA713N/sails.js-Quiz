module.exports = {
  primaryKey: 'id', 
  attributes: {
    id: { type: 'number', autoIncrement: true, columnName: 'question_id', unique: true },
    questionText: { type: 'string', required: true, columnName: 'question_text' },
    quiz: {
      model: 'quiz',
      columnName: 'quiz_id'
    },
    createdAt: { type: 'ref', columnType: 'timestamp', autoCreatedAt: true },
    updatedAt: { type: 'ref', columnType: 'timestamp', autoUpdatedAt: true },
    answers: {
      collection: 'answer',
      via: 'question'
    }
  }
};
