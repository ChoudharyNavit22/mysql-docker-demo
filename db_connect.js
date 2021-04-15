const Sequelize = require("sequelize");
const sequelize = new Sequelize('myDatabase','db_user','password',{
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})

sequelize.authenticate().then( ()=> {
    console.log("Connection has been established successfully")
}).catch( err => {
    console.log("Unable to connect to the database",err)
})

const User = sequelize.define('users',{
    firstName: { type: Sequelize.STRING},
    lastName: { type: Sequelize.STRING}
})

sequelize.sync()
  .then(() => User.create({
    firstName: "John",
    lastName: "Hancock"
  }))
  .then(jane => {
    console.log(">>>>>>>>",jane.toJSON());
    User.findAll().then(users => {
        console.log("??????????????????",users)
    })
  });


module.exports = sequelize