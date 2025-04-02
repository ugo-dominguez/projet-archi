# Installation :
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