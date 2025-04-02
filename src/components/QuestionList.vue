<template>
    <div class="question-list">
      <h3>Questions</h3>
      
      <div v-if="questions.length === 0" class="no-questions">
        Aucune question dans ce questionnaire.
      </div>
      
      <ul v-else class="questions">
        <li v-for="question in sortedQuestions" :key="question.id" class="question-item">
          <div class="question-content" @click="$emit('select-question', question)">
            <span class="order">{{ question.ordre }}.</span>
            <span class="title">{{ question.title }}</span>
            <span class="type">{{ questionTypeLabel(question) }}</span>
          </div>
          <button @click.stop="$emit('delete-question', question.id)" class="delete-btn">
            Supprimer
          </button>
        </li>
      </ul>
      
      <button @click="$emit('add-question')" class="add-btn">
        Ajouter une question
      </button>
    </div>
</template>
  
<script>
export default {
  props: {
    questions: {
      type: Array,
      required: true
    }
  },
  computed: {
    sortedQuestions() {
      return [...this.questions].sort((a, b) => a.ordre - b.ordre)
    }
  },
  methods: {
    questionTypeLabel(question) {
      return question.question_type === 'open' 
        ? '(Question ouverte)' 
        : '(QCM)'
    }
  }
}
</script>

<style scoped>
.question-list {
  margin-bottom: 30px;
}

.no-questions {
  color: #999;
  font-style: italic;
  margin: 10px 0;
}

.questions {
  list-style: none;
  padding: 0;
  margin: 20px 0;
}

.question-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}

.question-item:hover {
  background-color: #f9f9f9;
}

.question-content {
  flex-grow: 1;
  display: flex;
  align-items: center;
  gap: 10px;
}

.order {
  font-weight: bold;
  min-width: 20px;
}

.type {
  color: #666;
  font-size: 0.9em;
}

.delete-btn {
  background-color: #ff6b6b;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

.add-btn {
  background-color: #48dbfb;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 3px;
  cursor: pointer;
  margin-top: 10px;
}
</style>