module.exports = {
    primaryKey: 'id', 
    attributes: {
      id: { type: 'number', autoIncrement: true, columnName: 'answer_id', unique: true },
      optionName: { type: 'string', required: true, columnName: 'option_name' },
      isChecked: { type: 'boolean', defaultsTo: false, columnName: 'is_checked' },
      question: { model: 'question', columnName: 'question_id' },
      createdAt: { type: 'ref', columnType: 'timestamp', autoCreatedAt: true },
      updatedAt: { type: 'ref', columnType: 'timestamp', autoUpdatedAt: true }
    }
  };
  