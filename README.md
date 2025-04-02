# projet-archi :

https://github.com/ugo-dominguez/projet-archi  
DOMINGUEZ Ugo  
GRUSON--DELANNOY  

## Installation :
Pour initialiser l'application, il suffit d'exécuter les commandes suivantes :
```bash
  $ pip install -r requirements.txt 
  $ cd quiz
  $ flask db init
  $ flask db migrate
  $ flask db upgrade
```

Pour lancer l'application, il faut lancer en parallèle l'api Flask :
```bash
  $ cd quiz
  $ flask run
```
et l'application Vue, avec un serveur :
```bash
  $ npm install
  $ npm run serve
```

## Composants :
- QuizList.vue : Afficher la liste des questionnaires  
- QuizEditor.vue : Affichage de l'édition d'un questionnaire, avec le lien vers les questions  
- QuestionList.vue : Afficher la liste des questions d'un questionnaire  
- OpenQuestionForm.vue : Afficher le formulaire des questions ouvertes  
- McqQuestionForm.vue : Afficher le formulaire des questions à choix multiples  

## Fonctionnalités et outils :
- Liste des questionnaires  
- Liste des questions d'un questionnaire  
- Ajout, modification et suppression de questionnaires  
- Ajout, modification et suppression de questions ouvertes  
- Ajout, modification et suppression de questions à choix multiples 
- Vérification du formulaire d'ajout de questionnaires
- Vérification du formulaire d'ajout de questions
- Provider : ./src/services/provider.js  
- Router : ./src/router.js  
