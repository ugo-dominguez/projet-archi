<template>
    <div class="question-form">
      <h3>{{ question.id ? 'Modifier' : 'Nouvelle' }} Question Ouverte</h3>
      
      <form @submit.prevent="save">
        <div class="form-group">
          <label>Titre:</label>
          <input v-model="formData.title" required>
        </div>
        
        <div class="form-group">
          <label>Ordre:</label>
          <input v-model.number="formData.ordre" type="number" min="1" required>
        </div>
        
        <div class="form-group">
          <label>Réponse attendue (optionnelle):</label>
          <textarea v-model="formData.expected_answer" rows="3"></textarea>
        </div>
        
        <div class="form-actions">
          <button type="submit">Enregistrer</button>
          <button type="button" @click="cancel">Annuler</button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      question: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        formData: {
          title: this.question.title,
          ordre: this.question.ordre,
          question_type: 'open',
          expected_answer: this.question.expected_answer,
          questionnaire_id: this.question.questionnaire_id
        }
      }
    },
    methods: {
      save() {
        const dataToSave = { ...this.formData }
        if (this.question.id) dataToSave.id = this.question.id
        
        this.$emit('save', dataToSave)
      },
      cancel() {
        this.$emit('cancel')
      }
    }
  }
  </script>
  
  <style scoped>
  .question-form {
    margin-top: 30px;
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .form-group input,
  .form-group textarea {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .form-group textarea {
    min-height: 80px;
  }
  
  .form-actions {
    display: flex;
    gap: 10px;
    margin-top: 20px;
  }
  
  .form-actions button {
    padding: 8px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .form-actions button:first-child {
    background-color: #4CAF50;
    color: white;
  }
  
  .form-actions button:last-child {
    background-color: #f44336;
    color: white;
  }
  </style>