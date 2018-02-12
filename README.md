# churras-company-nodeapi


## Tecnologias


API desenvolvida em NodeJS para estudos desenvolvido com as tenologias.
- [Express](http://expressjs.com/pt-br/);
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](http://mongoosejs.com/);
- [JWT](https://jwt.io/);


## Desenvolvimento


Antes de rodar o projeto, você precisará rodar um banco local (ou apontar para um banco na nuvem), para isso fação download do [MongoDB](https://www.mongodb.com/download-center?jmp=nav#community). 

Depois de baixado, coloque no Path do Windows, a pasta bin do MongoDB, então, execute o seguinte comando para rodar o banco de dados, o endereço do banco. deve ser uma pasta fisica no seu computador:

`mongod --port 27017 --dbpath <dbpath>`

Depois, basta rodar `npm run dev` e rodará a aplicação na url `http://localhost:3000/`.
