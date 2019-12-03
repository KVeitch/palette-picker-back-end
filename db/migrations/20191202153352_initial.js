
exports.up = function(knex) {
  return Promise.all([
    knex.schema.createTable('users', table => {
      table.increments('id').primary();
      table.text('user_name');
      table.text('password');

      table.timestamps(true, true);
    }),

    knex.schema.createTable('projects', table => {
      table.increments('id').primary();      
      table.text('project_name');
      table.unique('project_name');
      table.integer('user_id').references('users.id')

      table.timestamps(true, true);
    }),

    knex.schema.createTable('palettes', table => {
      table.increments('id').primary();
      table.text('palette_name');
      table.integer('project_id').references('projects.id')
      table.string('color0',6);
      table.string('color1',6);
      table.string('color2',6);
      table.string('color3',6);
      table.string('color4',6);
      
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
