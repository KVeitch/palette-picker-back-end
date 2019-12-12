import '@babel/polyfill';
import request from 'supertest';
import app from './app';

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

describe('Server', () => {
  beforeEach(async () => {
    await database.seed.run();
  });

  describe('GET /', () => {
    it('should return a message directing the user to the backend repo', async () => {
      const res = await request(app).get('/');

      expect(res.status).toBe(200);
      expect(res.text).toEqual('For documentation on this API, please visit https://github.com/KVeitch/palette-picker-back-end')
    })
  })

  describe('GET /api/v1/projects', () => {
    it('should return a 200 and all projects', async () => {
      const expectedProjects = await database('projects').select();
      const expectedProjectIds = expectedProjects.map(project => project.id);

      const res = await request(app).get('/api/v1/projects');
      const projects = res.body;
      const projectIds = projects.map(project => project.id);

      expect(projectIds).toEqual(expectedProjectIds);
    });
  });

  describe('GET /api/v1/login', () => {
    it('should return a 200 and a specific user id, HAPPY', async () => {
      //setup
      const expectedUser = await database('users').first();
      const { id, user_name, password } = expectedUser;

      //execution
      const res = await request(app).get(
        `/api/v1/login?user_name=${user_name}&password=${password}`
      );
      const userId = res.body.id;
      //expectation
      expect(res.status).toBe(200);
      expect(userId).toEqual(id);
    });

    it('should return a 404 and an error if the username and password do not have a match, SAD', async () => {
      //setup
      const user_name = null;
      const password = null;
      //execution
      const res = await request(app).get(
        `/api/v1/login?user_name=${user_name}&password=${password}`
      );
      //expectation
      expect(res.status).toBe(404);
    });

    it('should return a 422 if a password or username is not provided, SAD', async () => {
      //setup
      const user_name = null;
      const password = null;
      //execution
      const res1 = await request(app).get(
        `/api/v1/login?user_name=${user_name}`
      );
      const res2 = await request(app).get(`/api/v1/login?password=${password}`);
      //expectation
      expect(res1.status).toBe(422);
      expect(res2.status).toBe(422);
    });
  });

  describe('DELETE /api/v1/projects/:id', () => {
    it('should return a 202 and remove a project from the database, HAPPY', async () => {
      //setup
      const projects = await database('projects').select();
      const projectCount = projects.length;
      const projectToRemove = await database('projects').first();
      const { id } = projectToRemove;

      //execution
      const res = await request(app).del(`/api/v1/projects/${id}`);
      const remainingProjects = await database('projects').select();
      const newProjectCount = remainingProjects.length;

      //expectation
      expect(newProjectCount).toBe(projectCount - 1);
    });

    it('should return a 404 when a project was not found rto be deleted, SAD', async () => {
      //setup
      const projects = await database('projects').select();
      const projectCount = projects.length;
      const projectToRemove = await database('projects').first();
      const { id } = projectToRemove;

      //execution
      const firstRes = await request(app).del(`/api/v1/projects/${id}`);
      const secondRes = await request(app).del(`/api/v1/projects/${id}`);

      //expectation
      expect(secondRes.status).toBe(404);
    });
  });

  describe('DELETE /api/v1/palettes/:id', () => {
    it('should return a 202 and remove a palette from the database, HAPPY', async () => {
      //setup
      const palettes = await database('palettes').select();
      const paletteCount = palettes.length;
      const paletteToRemove = await database('palettes').first();
      const { id } = paletteToRemove;

      //execution
      const res = await request(app).del(`/api/v1/palettes/${id}`);
      const remainingPalettes = await database('palettes').select();
      const newPaletteCount = remainingPalettes.length;

      //expectation
      expect(newPaletteCount).toBe(paletteCount - 1);
    });

    it('should return a 404 when a palette was not found to be deleted, SAD', async () => {
      //setup
      const palettes = await database('palettes').select();
      const paletteCount = palettes.length;
      const paletteToRemove = await database('palettes').first();
      const { id } = paletteToRemove;

      //execution
      const firstRes = await request(app).del(`/api/v1/palettes/${id}`);
      const secondRes = await request(app).del(`/api/v1/palettes/${id}`);

      //expectation
      expect(secondRes.status).toBe(404);
    });
  });

  describe('POST /api/v1/projects', () => {
    it('should retun a 202 add a project, HAPPY', async () => {
      //setup
      const user = await database('users').first();
      const { id } = user;
      const newProj = {
        project_name: 'New Project for testing',
        user_id: id
      };
      //execution
      const res = await request(app)
        .post('/api/v1/projects')
        .send(newProj);

      const projects = await database('projects').where(
        'id',
        parseInt(res.body.id)
      );

      const project = projects[0];
      //expectation
      expect(res.status).toBe(201);
      expect(project.project_name).toBe(newProj.project_name);
    });

    it('should return a 422 with and error when an incomplete project is submitted, SAD', async () => {
      //setup
      const newProj = {
        project_name: 'New Project for testing'
      };
      const expectedError = `Expected format: { project_name: <String>, user_id: <Integer> }. You're missing a "user_id" property.`;
      //execution
      const res = await request(app)
        .post('/api/v1/projects')
        .send(newProj);
      const error = res.body.error;
      //expectation
      expect(error).toBe(expectedError);
    });
  });

  describe('GET /api/v1/palletes?color=color', () => {
    it('should return a 200 and all of the palettes containing a given color, HAPPY', async () => {
      //setup
      const color = 'FFFF00';
      const expectedPaletts = await database('palettes')
        .where('color0', color)
        .orWhere('color1', color)
        .orWhere('color2', color)
        .orWhere('color3', color)
        .orWhere('color4', color);
      //execution
      const foundPalettes = await request(app).get(`/api/v1/palettes/search/${color}`);
      //expectation
      expect(foundPalettes.status).toBe(200);
      expect(foundPalettes.body.length).toEqual(expectedPaletts.length);
    });

    it('should return a 404 if no palettes are found, SAD', async () => {
      //setup
      const color = 'NotAColor';
      const errMsg = 'No palettes containing NotAColor were found';
      //execution
      const foundPalettes = await request(app).get(`/api/v1/palettes/search/${color}`);
      //expectation
      expect(foundPalettes.status).toBe(404);
      expect(foundPalettes.body).toEqual(errMsg);
    });
  });

  describe('POST /api/v1/palettes/', () => {
    it('should return a 201 and add a palette to the DB, HAPPY', async () => {
      //setup
      const aProject = await database('projects').first();
      const project_id = aProject.id;
      const newPalette = {
        project_id,
        palette_name: 'Test Palette',
        color0: 'color0',
        color1: 'color1',
        color2: 'color2',
        color3: 'color3',
        color4: 'color4'
      };
      //execution
      const res = await request(app)
        .post('/api/v1/palettes')
        .send(newPalette);
      const palettes = await database('palettes').where(
        'id',
        parseInt(res.body.id)
      );
      const palette = palettes[0];
      //expectation
      expect(res.status).toBe(201);
      expect(palette.palette_name).toBe(newPalette.palette_name);
    });

    it('should return a 422 with and error when an incomplete palette is submitted, SAD', async () => {
      //setup
      const aProject = await database('projects').first();
      const project_id = aProject.id;
      const newPalette = {
        project_id,
        palette_name: 'Test Palette',
        color0: 'color0',
        color1: 'color1',
        color3: 'color3',
        color4: 'color4'
      };
      const expectedError = `Expected format: { 'project_id':<String>, 'palette_name':<String> 'color0':<String>,'color1':<String>,'color2':<String>,'color3':<String>,'color4':<String>}. You're missing a "color2" property.`;
      //execution
      const res = await request(app)
        .post('/api/v1/palettes')
        .send(newPalette);
      const error = res.body.error;
      //expectation
      expect(error).toBe(expectedError);
    });
  });

  describe('GET /api/v1/palettes', () => {
    it('should return a 200 and all palettes', async () => {
      const expectedPalettes = await database('palettes').select();
      const expectedPaletteIds = expectedPalettes.map(palette => palette.id);

      const res = await request(app).get('/api/v1/palettes');
      const palettes = res.body;
      const paletteIds = palettes.map(palette => palette.id);

      expect(res.status).toBe(200);
      expect(paletteIds).toEqual(expectedPaletteIds);
    });
  });

  describe('GET /api/v1/projects/:id', () => {
    it('should return a 200 and a specific project with a given id, HAPPY', async () => {
      const expectedProject = await database('projects').first();
      const { id } = expectedProject;

      const res = await request(app).get(`/api/v1/projects/${id}`);
      const project = res.body[0];

      expect(res.status).toBe(200);
      expect(project.id).toEqual(id);
    });

    it('should return a 404 if no project is found, SAD', async () => {
      const id = -1;

      const res = await request(app).get(`/api/v1/projects/${id}`);

      expect(res.status).toBe(404)
      expect(res.body).toEqual({ error: `No project matching id -1 was found!` });
    });
  });

  describe('GET /api/v1/palettes/:id', () => {
    it('should return a 200 and a specific palette with a given id', async () => {
      const expectedPalette = await database('palettes').first();
      const { id } = expectedPalette;

      const res = await request(app).get(`/api/v1/palettes/${id}`);
      const palette = res.body[0];

      expect(res.status).toBe(200);
      expect(palette.id).toEqual(id);
    });

    it('should return a 404 if no palette is found, SAD', async () => {
      const id = -1;

      const res = await request(app).get(`/api/v1/palettes/${id}`);

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ error: `No palette matching id -1 was found!` });
    });
  });

  describe('GET /api/v1/projects/:id', () => {
    it('should return a 200 and a specific project with a given id', async () => {
      const expectedProject = await database('projects').first();
      const { id } = expectedProject

      const res = await request(app).get(`/api/v1/projects/${id}`);
      const project = res.body[0];

      expect(res.status).toBe(200);
      expect(project.id).toEqual(id);
    });
  });

  describe('GET /api/v1/palettes/:id', () => {
    it('should return a 200 and a specific palette with a given id', async () => {
      const expectedPalette = await database('palettes').first();
      const { id } = expectedPalette

      const res = await request(app).get(`/api/v1/palettes/${id}`);
      const palette = res.body[0];

      expect(res.status).toBe(200);
      expect(palette.id).toEqual(id);
    });
  });

  describe('PATCH /api/v1/projects/:id', () => {
    it('should return a 201 and update a specific project with a new ', async () => {
      const update = { project_name: 'Kitchen backsplash' }
      const projectToUpdate = await database('projects').first();
      const { id } = projectToUpdate

      const res = await request(app).patch(`/api/v1/projects/${id}`).send(update)
      const updatedProject = await database('projects').where({id}).select();

      expect(res.status).toBe(201);
      expect(updatedProject[0].project_name).toEqual(update.project_name);
    });
  });
});
