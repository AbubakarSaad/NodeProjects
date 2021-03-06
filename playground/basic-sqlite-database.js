/**
 * Created by abubakarsaad on 2016-02-24.
 */
var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
    'dialect':'sqlite',
    'storage':__dirname + '/basic-sqlite-database.sqlite'
});

var Todo = sequelize.define('todo',{
   description: {
       type: Sequelize.STRING,
       allowNull: false,
       validate:{
           len: [1, 250]
       }
   },
    completed:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

var User = sequelize.define('user', {
    email: Sequelize.STRING,
});

Todo.belongsTo(User);
User.hasMany(Todo);

sequelize.sync({
    //force: true
}).then(function(){
    console.log('Everything is synced');


    User.findById(1).then(function(user) {
        user.getTodos({
            where: {
                completed: false
            }
        }).then(function (todos){
            todos.forEach(function (todo){
                console.log(todo.toJSON());
            });
        });
    });

    // User.create({
    //     email: 'abu@email.com',
    // }).then(function() {
    //     return Todo.create({
    //         description: 'Clean yard'
    //     });
    // }).then(function(todo) {
    //     User.findById(1).then(function (user) {
    //         user.addTodo(todo);
    //     });
    // });

    // fetch todo items by its id
    //  print to the screen if it exists using JSON
    //      if it doesn't print an error 'Todo item not found'

    // Todo.findById(3).then(function(todo){
    //     console.log(todo.toJSON());
    // }).catch(function (e){
    //     console.log('Todo Item not found');
    // });

    


    //Todo.create({
    //    description: 'take out the trash'
    //}).then(function(todo){
    //    return Todo.create({
    //        description: 'Clean office'
    //    });
    //}).then(function(){
    //    //return Todo.findById(1);
    //    return Todo.findAll({
    //       where:{
    //           description: {
    //               $like: '%trash%'
    //           }
    //       }
    //    });
    //}).then(function(todos){
    //    if(todos){
    //        todos.forEach(function (todo){
    //            console.log(todo.toJSON());
    //        });
    //    }else{
    //        console.log('no todo found!');
    //    }
    //}).catch(function (e){
    //    console.log(e);
    //});

});
