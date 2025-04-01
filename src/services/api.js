const API_URL = 'http://127.0.0.1:5000'

export default {
  getQuestionnaires() {
    return fetch(`${API_URL}/questionnaires`)
      .then(response => response.json())
  },
  
  createQuestionnaire(data) {
    return fetch(`${API_URL}/questionnaires`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
  },
  
  updateQuestionnaire(id, data) {
    return fetch(`${API_URL}/questionnaires/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
  },
  
  deleteQuestionnaire(id) {
    return fetch(`${API_URL}/questionnaires/${id}`, {
      method: 'DELETE'
    })
  },
  
  getQuestions(questionnaireId) {
    return fetch(`${API_URL}/questionnaires/${questionnaireId}/questions`)
      .then(response => response.json())
  },
  
  createQuestion(questionnaireId, data) {
    return fetch(`${API_URL}/questionnaires/${questionnaireId}/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
  },
  
  updateQuestion(id, data) {
    return fetch(`${API_URL}/questions/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
  },
  
  deleteQuestion(id) {
    return fetch(`${API_URL}/questions/${id}`, {
      method: 'DELETE'
    })
  }
}