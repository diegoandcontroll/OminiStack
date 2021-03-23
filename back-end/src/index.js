/**
 * Tipos de Parâtametros
 * 
 * Query params: Parâmetros nomeados e enviados na rota após o "?" (Filtros e paginação)
 *
 * Router params: ParÂmetros utilizado  para identificar rercursos
 * 
 * Request Body: Corpo da requisição utilizado ou alterar recursos 
 * 
 * //const params = request.query; //retorna com os parametros da rota
    
    //console.log(params)

    //####Query Params####

    //return response.send('Hellow World') //retorna um texto com o response

    //const params = request.params;

    // ####Router Params####
    //console.log(params)

    //###Request Body###
 */


const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
app.use(routes)

app.listen(3333);