
exports.up = function(knex) {
    return knex.schema.createTable('users', users => {
        users.increments();
        users
            .string('username', 16)
            .notNullable()
            .unique();
        users
            .string('password', 16)
            .notNullable();
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
