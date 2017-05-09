const express = require('express');
const bodyParser = require('body-parser');

const todoModel = require('../model/todos.js');


const router = express.Router();

router.use(bodyParser.json());

// List
router.get('/todos', function(req, res) {
    todoModel.list(req.query.accomplishTodo,req.query.searchText).then(todos => {
        res.json(todos);
    });
});

// Create
router.post('/todos', function(req, res) {
    const {mood, text} = req.body;
    if (!mood || !text) {
        const err = new Error('Mood and text are required');
        err.status = 400;
        throw err;
    }
    todoModel.create(mood, text).then(todo => {
        res.json(todo);
    });
});

// // Vote
// router.todo('/todos/:id/:mood(clear|clouds|drizzle|rain|thunder|snow|windy)Votes', function(req, res) {
//     const {id, mood} = req.params;
//     if (!id || !mood) {
//         const err = new Error('todo ID and mood are required');
//         err.status = 400;
//         throw err;
//     }
//     voteModel.create(id, mood).then(todo => {
//         res.json(todo);
//     });
// });

module.exports = router;
