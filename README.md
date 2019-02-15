# Gaps - Did I fail ?

Vincent Guidoux

## Introduction

This programm let you know the five last modules and the last five courses you acheived at the HEIG-VD

## Deployment

You need to download the repo and go **inside**:

```
git clone https://github.com/Nortalle/Gaps_did_I_fail.git
cd Gaps_did_I_fail
```

Install the dependencies and copy the `.env`

```
npm i
cp .env.tmp .env
```

You need to put three things in the `.env`

```
LOGIN=
PASSWORD=
ID=
```

The **ID** is the little number in the url of your records. In the picture down below, it's `12966`. This ID is unique for each user and is not changed through time.

![ID](./pictures/ID.PNG)

Once you done that just :

```
node index.js
```

And **voilà** :

```
Nombre de modules réussis : 16
   - SEC
   - MAI
   - MLO
   - PRO
   - SRL
Nombre de cours réussis : 29
   - Réseaux
   - Sécurité des logiciels
   - Programmation concurrente
   - Systèmes d'exploitation
   - Projet de semestre
```

##Links

[HTTP Parser/viewer](https://astexplorer.net/#/)

[Parse5 Documentation](https://github.com/inikulin/parse5/blob/master/packages/parse5/docs/index.md)

