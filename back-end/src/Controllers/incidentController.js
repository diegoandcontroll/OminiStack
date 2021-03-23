const connection = require('../database/connection');

module.exports = {
    async index(request,response){

        const {page = 1} = request.query; //busca no request.query o parametro page se n existir ela seta 1 

        const [count] = await connection('incidents').count();
        console.log(count);
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5 )
            .select([
                'incidents.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.city',
                'ongs.uf'
        ]);
        
        response.header('X-Total-Count',count['count(*)']);
        
        return response.json(incidents);
    },
    async create(request,response){
        const {title, description, value} = request.body;
        const ong_id = request.headers.authorization; // pega o id dentro do cabeçalho

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });
        return response.json({id});
    },
    async delete(request,response){
        const { id } = request.params;

        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id',id)
            .select('ong_id')
            .first();
            //verifica se existe o id dentro de incedents
        if(incident.ong_id !== ong_id){//verifica se o id do incident cadastrado e difirente do id da ong que cadastrou o incident
            return response.status(401).json({error:'Operation not Permitted'});
        }
        
        await connection('incidents').where('id',id).delete();

        return response.status(204).send();
    }
}