<template>
  <div class="quiz-list">
    <div class="header">
      <h2>Liste des Questionnaires</h2>
      <button @click="refreshList" class="refresh-btn">Actualiser</button>
      <button @click="showNewQuizForm = true" class="new-btn">Nouveau Questionnaire</button>
    </div>
    
    <div v-if="showNewQuizForm" class="new-quiz-form">
      <input v-model="newQuizName" placeholder="Nom du questionnaire">
      <button @click="createQuiz">Créer</button>
      <button @click="showNewQuizForm = false">Annuler</button>
    </div>
    
    <ul class="quiz-items">
      <li v-for="quiz in questionnaires" :key="quiz.id" class="quiz-item">
        <router-link :to="`/quiz/${quiz.id}`">{{ quiz.name }}</router-link>
        <button @click="deleteQuiz(quiz.id)" class="delete-btn">Supprimer</button>
      </li>
    </ul>
  </div>
</template>

<script>
import provider from '@/services/provider'

export default {
  data() {
    return {
      questionnaires: [],
      showNewQuizForm: false,
      newQuizName: ''
    }
  },
  created() {
    this.fetchQuestionnaires()
  },
  methods: {
    fetchQuestionnaires() {
      provider.getQuestionnaires()
        .then(data => {
          this.questionnaires = data
        })
        .catch(error => {
          console.error('Error fetching questionnaires:', error)
        })
    },
    refreshList() {
      this.fetchQuestionnaires()
    },
    createQuiz() {
      if (!this.newQuizName.trim()) return
      
      provider.createQuestionnaire({ name: this.newQuizName })
        .then(newQuiz => {
          this.questionnaires.push(newQuiz)
          this.newQuizName = ''
          this.showNewQuizForm = false
        })
        .catch(error => {
          console.error('Error creating questionnaire:', error)
        })
    },
    deleteQuiz(id) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce questionnaire ?')) {
        provider.deleteQuestionnaire(id)
          .then(() => {
            this.questionnaires = this.questionnaires.filter(q => q.id !== id)
          })
          .catch(error => {
            console.error('Error deleting questionnaire:', error)
          })
      }
    }
  }
}
</script>

<style scoped>
.quiz-list {
  max-width: 800px;
  margin: 0 auto;
}

.header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.quiz-items {
  list-style: none;
  padding: 0;
}

.quiz-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.quiz-item a {
  text-decoration: none;
  color: #2c3e50;
  flex-grow: 1;
}

.quiz-item a:hover {
  text-decoration: underline;
}

.new-quiz-form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

button {
  padding: 5px 10px;
  cursor: pointer;
}

.delete-btn {
  background-color: #ff6b6b;
  color: white;
  border: none;
  border-radius: 3px;
}

.refresh-btn {
  background-color: #4ecdc4;
  color: white;
  border: none;
  border-radius: 3px;
}

.new-btn {
  background-color: #48dbfb;
  color: white;
  border: none;
  border-radius: 3px;
}
</style>