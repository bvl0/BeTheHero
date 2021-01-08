const connection = require('../database/connection');
module.exports = {
    async session(request, response){
        const {id} = request.body;
        const session= await connection('ongs').where('id',id).select('name').first();

        if(!session){
            return response.status(400).json({error: 'sequelo meno'})
        }

    return response.json(session);
    }
}