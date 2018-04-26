const Datastore = require('@google-cloud/datastore');
const projectId = 'testing-201804';
const datastore = new Datastore({
	projectId: projectId
});
const userKey = datastore.key('Usuarios');


function getUsers(req,res){
	var data = [];
	const query = datastore.createQuery('Usuarios').order('apellido');
	datastore.runQuery(query, function(err, entities) {
		if(err){
			return res.status(500).send({message: "Error, el servidor no pudo procesar esta solicitud"});
		}else{
			
			if(!entities){
				return res.status(404).send({message: "No se encontraron registros."});
			} else {
				for(var x=0; x<entities.length;x++){
					data.push({
						nombre: entities[x].nombre
					});
				}
				return res.status(200).send(data);			
			}
		}
	});
	
}
function addUser(req,res){
	console.log("ASD");
	
	var params = req.body;
	console.log("parametros: ", params);
	if(params.nombre == "" || params.apellido == "" || params.email =="" || params.password == ""){
		return res.status(400).send({message: "Atención, faltan datos para enviar esta solicitud."});
	}
	
	const usuarioNuevo =  {
		key: userKey,
		data:[
			{
				name: 'nombre',
				value: params.nombre
			},
			{
				name: 'apellido',
				value: params.apellido
			},
			{
				name: 'email',
				value: params.email
			},
			{
				name: 'password',
				value: params.password
			},
		],
	};
	console.log("Usuario a insertar: ",usuarioNuevo);
	
	
	datastore.save(usuarioNuevo).then(() => {
		console.log('Usuario ', params.nombre, ' created succesfully');
		return res.status(200).send({message: "Agregado"});
	}).catch(err => {
		console.log('ERROR: ', err);
	});
	
}

function demo(req, res){
	
	const usuarioNuevo =  {
		key: userKey,
		data:[
			{
				name: 'nombre',
				value: 'Carlos'
			},
			{
				name: 'apellido',
				value: 'Mujica'
			},
			{
				name: 'email',
				value: 'carlos@gmail.com'
			},
			{
				name: 'password',
				value: '123'
			},
		],
	};
	
	datastore.save(usuarioNuevo).then(() => {
		console.log('Usuario ${userKey.id} created succesfully');
		return res.status(200).send({message: "Agregado"});
	}).catch(err => {
		console.log('ERROR: ', err);
	});
    
    /*var params = req.params;
    return res.status(200).send({message: "wena wena", dato_entrada: params});*/
}

module.exports = {
    demo,
    getUsers,
    addUser
};