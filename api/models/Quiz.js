/**
 * Quiz.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  primaryKey: 'id',
  attributes: {
    id: { type: 'number', autoIncrement: true, columnName: 'id', unique: true },
    title: { type: 'string', required: true },
    userId: { type: 'number', columnName: 'user_id' },
    // createdAt: { type: 'ref', columnType: 'timestamp', autoCreatedAt: true },
    // updatedAt: { type: 'ref', columnType: 'timestamp', autoUpdatedAt: true },
    questions: {
      collection: 'question',
      via: 'quiz'
    }
  }
};

// api/models/Quiz.js





