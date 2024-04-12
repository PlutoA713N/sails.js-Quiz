module.exports = {
    attributes: {
      optionName: { type: 'string', required: true },
      isChecked: { type: 'boolean', defaultsTo: false },
      question: {
        model: 'question'
      }
    }
  
  };
  