module.exports = {
    primaryKey: 'id', 
    attributes: {
      id: { type: 'number', autoIncrement: true, columnName: 'quiz_id', unique: true },
      title: { type: 'string', required: true },
      userId: { type: 'number', columnName: 'user_id' },
      createdAt: { type: 'ref', columnType: 'timestamp', autoCreatedAt: true },
      updatedAt: { type: 'ref', columnType: 'timestamp', autoUpdatedAt: true },
      questions: {
        collection: 'question',
        via: 'quiz'
      }
    }
  };
  