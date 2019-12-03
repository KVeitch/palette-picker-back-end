import users from './data/users';
import projects from './data/projects';
import palettes from './data/pallets';

const createUser = (knex, user) => {
  return knex('users')
    .insert(
      {
        user_name: user.user_name,
        password: user.password
      },
      'id'
    )
    .then(user_id => {
      let projectPromises = [];
      projects
        .filter(project => project.user_id === user_id[0])
        .forEach(project => {
          projectPromises.push(
            createProject(
              knex,
              {
                project_name: project.project_name,
                user_id: user_id[0]
              },
              'id'
            ).then(project_id => {
              let palettePromises = [];
              palettes
                .filter(palette => pallet.project_id === project_id[0])
                .forEach(palette => {
                  palettePromises.push(
                    createPalette(knex, {
                      pallet_name: palette.pallet_name,
                      project_id: project_id[0],
                      color0: palette.color0,
                      color1: palette.color1,
                      color2: palette.color2,
                      color3: palette.color3,
                      color4: palette.color4
                    })
                  );
                });
            })
          );
        });
    });
};

const createProject = (knex, project) => knex('projects').insert(project);

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
