const fs = require('fs');
const uuid = require('uuid/v4');
const moment = require('moment');

function list(unaccomplishedOnly = false,searchText = '') {
    return new Promise((resolve, reject) => {
        if (!fs.existsSync('data-todos.json')) {
            fs.writeFileSync('data-todos.json', '');
        }

        fs.readFile('data-todos.json', 'utf8', (err, data) => {
            if (err) reject(err);

            let todos = data ? JSON.parse(data) : [];
            if (unaccomplishedOnly) {
                todos = todos.filter(t => {
                    return !t.doneTs;
                });
            }
            if (todos.length > 0 && searchText) {
                todos = todos.filter(p => {
                    return p.text.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
                });
            }
            resolve(todos);
        });
    });
}

function create(mood, text) {
    return new Promise((resolve, reject) => {
      const newTodo = {
          id: uuid(),
          mood: mood,
          text: text,
          ts: moment().unix(),
          doneTs: null
      };
        list().then(todos => {
            todos = [
                newTodo,
                ...todos
            ];
            fs.writeFile('data-todos.json', JSON.stringify(todos), err => {
                if (err) reject(err);

                resolve(newPost);
            });
        });
    });
}
function accomplishTodo(id) {
    return new Promise((resolve, reject) => {
      list().then(todos => {
        for(let t of todos) {
            if(t.id === id) {
                t.doneTs = moment().unix();
                break;
            }
        }
        fs.writeFile('data-todos.json', JSON.stringify(todos), err => {
            if (err) reject(err);

            resolve();
          });
      });
}

module.exports = {
    list,
    create,
    accomplishTodo
};
