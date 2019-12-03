const users = require('../data/users');
const projects = require('../data/projects');
const palettes = require('../data/paletts');

const createUser = (knex, user) => {
  return knex('users')
    .insert(
      {
        user_name: user.name,
        password: user.password
      },
      'id'
    )
    .then(user_id => {
      let projectPromises = [];
      projects
      .filter(project => project.user_id === user.id)
      .forEach(project => {
        console.log('user_id',user.id, project)
          projectPromises.push(
            createProject(knex, {
              project_id: project.project_id,
              project_name: project.project_name,
              user_id: user_id[0]
            })
            );
        });
      return Promise.all(projectPromises)
    });
};

const createProject = (knex, project) =>
  knex('projects')
    .insert({               
      project_name: project.project_name,
      user_id: project.user_id
    }, 'id')
    .then(project_id => {
      console.log(project_id);
      let palettePromises = [];
      palettes
        .filter(palette => {
          console.log(palette, project);
          return palette.project_id === project.project_id
        })
        .forEach(palette => {
          palettePromises.push(
            createPalette(knex, {
              palette_name: palette.palette_name,
              project_id: project_id[0],
              color0: palette.color0,
              color1: palette.color1,
              color2: palette.color2,
              color3: palette.color3,
              color4: palette.color4
            })
          );
        });
        
        return Promise.all(palettePromises)
    });

const createPalette = (knex, palette) => knex('palettes').insert(palette);

exports.seed = function(knex) {
  return knex('palettes')
    .del()
    .then(() => knex('projects').del())
    .then(() => knex('users').del())
    .then(() => {
      let userPromises = [];
      users.forEach(user => {
        userPromises.push(createUser(knex, user));
      });
      return Promise.all(userPromises);
    })
    .catch(error => console.log(`We have a problem here! => ${error}`));
};
