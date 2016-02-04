/**
 * Created by colipsone on 2/4/2016.
 */
module.exports = function (app) {

  createUsers();

  function createUsers() {

    var Agent = app.models.agent;

    var users = getDefaultUsers();

    users.forEach(function(agent){
      Agent.findOrCreate({email: agent.email}, agent, function(err, instance){
        console.log(instance);
      });
    });
  }

  function getDefaultUsers(){
    return [{
      email: 'xim@rambler.ru',
      password: 'xim'
    }];
  }
}
