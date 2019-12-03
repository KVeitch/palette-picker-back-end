import "@babel/polyfill";
import request from 'supertest';
import app from './app';

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

describe('Server', () => {
  beforeEach(async () => {
    await database.seed.run()
  });
  
  // describe('init', () => {
  //   it('should return a 200 status', async () => {
  //     const res = await request(app).get('/')
  //     expect(res.status).toBe(200)
  //   });
  // });

  // describe('GET /api/v1/projects', () => {
  //   it('should return a 200 and all projects', async () => {
  //     const expectedProjects = await database('projects').select();

  //     const res = await request(app).get('/api/v1/projects');
  //     // const projects = 
  //   })
  // })








































































































  describe('GET /api/v1/projects', () => {
    it('should return a 200 and all projects', async () => {
      const expectedProjects = await database('projects').select();
      const expectedProjectIds = expectedProjects.map(project => project.id)

      const res = await request(app).get('/api/v1/projects');
      const projects = res.body;
      const projectIds = projects.map(project => project.id);
      
      expect(projectIds).toEqual(expectedProjectIds);
    });
  });




























































  




  describe('GET /api/v1/users/?name=name+password=password', () => {
    it('should return a 200 and a specific user id', async () => {
      //setup
      const expectedUser = await database('user').first()
      const { id, user_name, password } = expectedUser
      //execution
      const res = await request(app).get(`/api/v1/users/?name=${user_name}&password=${password}`);
      const userId = res.body;
      //expectation
      expect(res.status).toBe(200);
      expect(userId).toEqual(id)
    });
  })

  describe('DELETE /api/v1/projects/:id',()=>{
    it('should return a 202 and remove a project from the database', async () => {
      //setup
      const projects = await database('projects').select()
      const projectCount = projects.length
      const projectToRemove = await database('projects').first()
      const { id } = projectToRemove;
      
      //execution
      const res = await request(app).del(`/api/v1/projects/${id}`)
      const remainingProjects = await database('projects').select()
      const newProjectCount = remainingProjects.length

      //expectation
      console.log(res.body)
      expect(newProjectCount).toBe(projectCount -1)

    })
  })

  describe('POST /api/v1/projects', ()=>{
    it('should retun a 202 add a project, HAPPY', async ()=>{
      //setup
      const user = await database('users').first();
      const { id } = user
      const newProj = {
        project_name: "New Project for testing",
        user_id: id,
      }
      //execution
      const res = await request(app).post('/api/v1/projects').send(newProj)

      const projects = await database('projects').where('id', parseInt(res.body.id))

      const  project= projects[0]
      //expectation
      expect(res.status).toBe(201)
      expect(project.project_name).toBe(newProj.project_name)
    })

    it('', async () => {
      
    })

  })



  // describe('GET /api/v1/pallets/color/:color',()=>{
  //   it('should return a 200 and all of the palettes containing a given color, HAPPY',async ()=>{
  //     //setup


  //     //execution


  //     //expectation
  //   })

  //   it('should return a 404 if there are not palettes with the given color, SAD',async ()=>{
  //     //setup


  //     //execution


  //     //expectation
  //   })

  // })

  // describe('POST /api/v1/pallets/:name',()=>{
  //   it('should return a 201 and add a palette to the DB, HAPPY',async ()=>{
  //     //setup


  //     //execution


  //     //expectation

  //   })
  // })











});