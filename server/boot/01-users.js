/**
 * Created by colipsone on 2/4/2016.
 */
module.exports = function (app) {

  // create default user
  createDefaultUsers();

  function createDefaultUsers() {
    var Agent = app.models.agent;

    var admins = [{
      email: 'xim@rambler.ru',
      password: 'xim'
    }];

    admins.forEach(function (admin) {
      console.log(Agent.findOrCreate({email: admin.email}, function (err, dbAgent) {
        if (err) throw err;
        console.log('Admin: \'' + dbAgent.email + '\' has been created.');
        assignUserToRole('admin', dbAgent);
        assignUserToRole('agent', dbAgent);
      }))
    });
  }

  function assignUserToRole(roleName, user) {
    var Role = app.models.Role;
    Role.findOrCreate({name: roleName}, function (err, dbRole) {
      if (err) throw err;
      //assign user to the role
      var RoleMapping = app.models.RoleMapping;
      RoleMapping.findOrCreate({roleId: dbRole.id, principalId: user.id}, function (err) {
        if (err) throw err;
        console.log('\'' + dbRole.name + '\' role has been assigned to \'' + user.email + '\' user.');
      });
    })
  }
}
