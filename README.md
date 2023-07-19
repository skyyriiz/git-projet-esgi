## **Wof Bot - Gestion d'Association League of Legends ESGI**

Ce bot Discord a été développé pour gérer une association League of Legends à l'école ESGI. Il utilise une base de données MongoDB pour stocker toutes les données nécessaires.

## Fonctionnalités

Le bot propose les commandes suivantes :

- **/history** : Cette commande permet de consulter l'historique des 5 derniers matchs d'un joueur dans le mode de jeu choisi (TFT ou LoL). Le nom d'invocateur du joueur doit être spécifié en tant que sous-commande.

- **/assos** : Cette commande permet de gérer l'état de l'association. Les sous-commandes disponibles sont **open** (pour ouvrir l'association) et **close** (pour la fermer).

- **/info** : Cette commande affiche toutes les commandes disponibles pour interagir avec le bot.

- **/presence** : Cette commande permet aux membres de l'association de valider leur présence lors des sessions de jeu. Elle vérifie également si le joueur a joué pendant que l'association était ouverte ou s'il est actuellement en train de jouer.

- **/profile** : Cette commande permet de récupérer toutes les informations d'un joueur (rang dans les différents modes de jeu, niveau et image de profil). Le nom d'invocateur doit être spécifié en tant que sous-commande.

- **/register** : Cette commande permet aux utilisateurs de s'inscrire à l'association. Ils doivent fournir leur nom, prénom, choisir une classe parmi celles proposées, leur adresse e-mail et leur pseudo League of Legends.

- **/username** : Cette commande permet aux membres de l'association de mettre à jour leur nom d'invocateur dans la base de données après leur inscription.

## Installation

1. Clonez ce dépôt sur votre machine locale.
2. Installez les dépendances en exécutant la commande suivante :
```npm install```
3. Configurez les paramètres du bot, tels que le token d'authentification Discord et les informations de connexion à la base de données MongoDB.
4. Démarrez le bot en exécutant la commande suivante :
```node index.js```
