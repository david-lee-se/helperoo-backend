exports.up = function (knex) {
    return knex.schema
      .createTable('employees', (table) => {
        table.increments('id').primary();
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('hire_date').notNullable();
        table.string('date_of_birth').notNullable();
        table.string('phone').notNullable();
        table.string('email').notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      })
      .createTable('users', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('username').notNullable();
        table.string('password').notNullable();
        table.string('authorized').notNullable().defaultTo('false');
        table.string('phone').notNullable();
        table.string('email').notNullable();
        table.timestamp('updated_at').defaultTo(knex.fn.now());
      });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('inventory').dropTable('warehouse');
  };
  