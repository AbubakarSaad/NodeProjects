/**
 * Created by abubakarsaad on 2016-02-14.
 */
var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
    id: 1,
    description: 'Meet mom for lunch',
    completed: false
}, {
    id: 2,
    description: 'Go to the market',
    completed: true
}, {
    id:3,
    description: 'Meet Candy for a date',
    completed: false
}];

app.get('/', function(req,res){
   res.send('Todo API Root');
});

// GET /todos
app.get('/todos',function(req, res){
    res.json(todos);
});

// GET /todos/:id
app.get('/todos/:id', function(req, res){
    var todoId = parseInt(req.params.id, 10);
    var matchTodo;
    // Itearte of todos array. Find the match.
   todos.forEach(function(todo){
      if(todoId === todo.id){
          matchTodo = todo;
      }
   });

    if(matchTodo){
        res.json(matchTodo);
    }else{
        res.status(404).send();
    }
});


app.listen(PORT, function(){
    console.log('Express listening on port ' + PORT + '!');
});
