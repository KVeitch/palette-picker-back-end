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

app.get('/api/v1/users/?name+password', async (res, req)=>{


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
  const {id} = request.params;

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

export default app;