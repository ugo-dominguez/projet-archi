<template>
  <div class="quiz-editor">
    <div v-if="loading" class="loading">Chargement...</div>
    
    <div v-else>
      <div class="quiz-header">
        <h2>Editeur: {{ questionnaire.name }}</h2>
        <div class="quiz-actions">
          <input v-model="questionnaire.name" @change="updateQuiz">
          <button @click="deleteQuiz" class="delete-btn">Supprimer ce questionnaire</button>
        </div>
      </div>
      
      <QuestionList 
        :questions="questions" 
        @select-question="selectQuestion"
        @delete-question="deleteQuestion"
        @add-question="showQuestionTypeSelector = true"
      />
      
      <div v-if="showQuestionTypeSelector" class="question-type-selector">
        <h3>Ajouter une question</h3>
        <button @click="addQuestion('open')">Question Ouverte</button>
        <button @click="addQuestion('mcq')">Question à Choix Multiples</button>
        <button @click="showQuestionTypeSelector = false">Annuler</button>
      </div>
      
      <OpenQuestionForm 
        v-if="selectedQuestionType === 'open' && selectedQuestion" 
        :question="selectedQuestion"
        @save="saveQuestion"
        @cancel="deselectQuestion"
      />
      
      <McqQuestionForm 
        v-if="selectedQuestionType === 'mcq' && selectedQuestion" 
        :question="selectedQuestion"
        @save="saveQuestion"
        @cancel="deselectQuestion"
      />
    </div>
  </div>
</template>

<script>
import provider from '@/services/provider'
import QuestionList from './QuestionList'
import OpenQuestionForm from './OpenQuestionForm'
import McqQuestionForm from './McqQuestionForm'

export default {
  components: {
    QuestionList,
    OpenQuestionForm,
    McqQuestionForm
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      loading: true,
      questionnaire: {},
      questions: [],
      showQuestionTypeSelector: false,
      selectedQuestion: null,
      selectedQuestionType: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      
      Promise.all([
        provider.getQuestionnaires().then(quizzes => {
          this.questionnaire = quizzes.find(q => q.id == this.id) || {}
        }),
        provider.getQuestions(this.id).then(questions => {
          this.questions = questions
        })
      ]).finally(() => {
        this.loading = false
      })
    },
    updateQuiz() {
      provider.updateQuestionnaire(this.id, { name: this.questionnaire.name })
        .catch(error => {
          console.error('Error updating questionnaire:', error)
          this.fetchData()
        })
    },
    deleteQuiz() {
      if (confirm('Etes-vous sur de vouloir supprimer ce questionnaire et toutes ses questions ?')) {
        provider.deleteQuestionnaire(this.id)
          .then(() => {
            this.$router.push('/')
          })
          .catch(error => {
            console.error('Error deleting questionnaire:', error)
          })
      }
    },
    addQuestion(type) {
      this.showQuestionTypeSelector = false
      this.selectedQuestionType = type
      
      if (type === 'open') {
        this.selectedQuestion = {
          title: '',
          ordre: this.questions.length + 1,
          question_type: 'open',
          questionnaire_id: this.id,
          expected_answer: ''
        }
      } else {
        this.selectedQuestion = {
          title: '',
          ordre: this.questions.length + 1,
          question_type: 'mcq',
          questionnaire_id: this.id,
          choices: [
            { text: '', is_correct: false },
            { text: '', is_correct: false }
          ]
        }
      }
    },
    selectQuestion(question) {
      this.selectedQuestion = { ...question }
      this.selectedQuestionType = question.question_type
      
      if (question.question_type === 'mcq' && !question.choices) {
        this.selectedQuestion.choices = []
      }
    },
    deselectQuestion() {
      this.selectedQuestion = null
      this.selectedQuestionType = null
    },
    saveQuestion(questionData) {
      const isNew = !questionData.id
      
      const savePromise = isNew 
        ? provider.createQuestion(this.id, questionData)
        : provider.updateQuestion(questionData.id, questionData)
      
      savePromise
        .then(() => {
          this.fetchData()
          this.deselectQuestion()
        })
        .catch(error => {
          console.error('Error saving question:', error)
        })
    },
    deleteQuestion(id) {
      if (confirm('Etes-vous sûr de vouloir supprimer cette question ?')) {
        provider.deleteQuestion(id)
          .then(() => {
            this.fetchData()
            this.deselectQuestion()
          })
          .catch(error => {
            console.error('Error deleting question:', error)
          })
      }
    }
  },
  watch: {
    id() {
      this.fetchData()
    }
  }
}
</script>

<style scoped>
.quiz-editor {
  max-width: 1000px;
  margin: 0 auto;
}

.quiz-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.quiz-actions {
  display: flex;
  gap: 10px;
}

.loading {
  text-align: center;
  padding: 50px;
}

.question-type-selector {
  margin: 20px 0;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 5px;
}

.question-type-selector button {
  margin-right: 10px;
}

.delete-btn {
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}
</style>