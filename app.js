import express from 'express';
import cors from 'cors';
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.locals.title = 'Palette Picker Backend';
app.use(cors());
app.use(express.json());

app.get('/', (request, response) => {
  response.send('Palette picker - pick the palettes!');
});





















































































app.delete('/api/v1/projects/:id', async (request, response) => {
  const { id } = request.params;
 
  try {
    const removedProject = await database('projects').where({ id:id }).del()
    if(removedProject === 0) {
      return response.status(404).json(`No project with id of ${id} was found`)
    }
    response.status(202).json(`Project ${id} was deleted`)
  } catch(error) {
    response.status(500).json(error)
  }
})

app.post('/api/v1/projects', async (request, response) =>{
  const project = request.body;
  for (let requiredParameter of ['project_name', 'user_id']) {
    if (!project[requiredParameter]) {
      return response.status(422).json({
        error: `Expected format: { project_name: <String>, user_id: <Integer> }. You're missing a "${requiredParameter}" property.`
      });
    }
  }
  try {
    const id = await database('projects').insert(project,'id')

    response.status(201).json({ ...project, id })

  } catch(error) {
    response.status(500).json(error)
  }
})

app.get('/api/v1/login', async (request, response)=>{
  const { user_name, password } = request.query
  const user = {user_name, password}

  for (let requiredParameter of ['user_name', 'password']) {
    if (!user[requiredParameter]) {
      return response.status(422).json({
        error: `Please enter a valid username and password or create a login.`
      });
    }
  }

  try{
    const user = await database('users').where({ user_name, password });
    if(user.length){
      response.status(200).json(user[0])
    } else {
      response.status(404).json({error:'Incorrect user name or password, maybe create an account'})
    }
  } catch(error) {
    response.status(500).json(error)
  }

})

app.get(`/api/v1/paletts/:color`, async (request, response)=>{
  const { color } = request.params
  try {
    const returnedPalettes = await database('palettes').select()
    .where('color0', color)
    .orWhere('color1', color)
    .orWhere('color2', color)
    .orWhere('color3', color)
    .orWhere('color4', color)
    
    if(!returnedPalettes.length) {
      response.status(404).json(`No palettes containing ${color} were found`)
    } else {
      response.status(200).json(returnedPalettes)
    }
  } catch(error) {
    response.status(500).json(error)
  }

})

app.post('/api/v1/pallets/', async (request, response) =>{

  
  response.status(201).json(help)
})



app.get('/api/v1/projects', async (request, response) => {
  try {
    const projects = await database('projects').select();
    response.status(200).json(projects)
  } catch(error) {
    response.status(500).json({ error })
  }
})

app.get('/api/v1/projects/:id', async (request, response) => {
  const { id } = request.params;

  try {
    const project = await database('projects').where({ id });
    if (project.length) {
      response.status(200).json(project)
    } else {
      response.status(404).json({ error: `No project matching id ${id} was found!`})
    }
  } catch(error) {
    response.status(500).json({ error })
  }
})

app.get('/api/v1/palettes', async (request, response) => {
  try {
    const palettes = await database('palettes').select();
    response.status(200).json(palettes)
  } catch(error) {
    response.status(500).json({ error })
  }
})

app.get('/api/v1/palettes/:id', async (request, response) => {
  const {id} = request.params;

  try {
    const palette = await database('palettes').where({ id });
    if (palette.length) {
      response.status(200).json(palette)
    } else {
      response.status(404).json({ error: `No palette matching id ${id} was found!`})
    }
  } catch(error) {
    response.status(500).json({ error })
  }
})

app.patch('/api/v1/projects/:id', async (request, response) => {
  const { id } = request.params;

  try {
    const project = await database('projects').where({id}).update(request.body, ['project_name']);
    response.status(201).json(project)
  } catch(error) {
    response.status(500).json({ error })
  }
})

export default app;