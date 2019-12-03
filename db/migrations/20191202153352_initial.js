
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('users', table => {
      table.increments('id').primary();
      table.string('user_name');
      table.string('password');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('projects', table => {
      table.increments('id').primary();      
      table.string('project_name');
      table.unique('project_name');
      table.integer('user_id').references('users.id')

      table.timestamps(true, true);
    }),

    knex.schema.createTable('palettes', table => {
      table.increments('id').primary();
      table.string('palette_name');
      table.integer('project_id').references('projects.id')
      table.string('color0');
      table.string('color1');
      table.string('color2');
      table.string('color3');
      table.string('color4');
      
      table.timestamps(true, true)
    })

  ])
};

exports.down = function(knex) {
  return Promise.all([
    knex.schema.dropTable('palettes'),
    knex.schema.dropTable('projects'),
    knex.schema.dropTable('users')  
  ]);
};
