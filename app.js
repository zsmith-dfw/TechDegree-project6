const express = require('express');
const app = express()

const  { projects } = require('./data.json');


app.set('view engine', 'pug')

app.use( '/static', express.static('public') );

app.get('/', (req, res) => {

        res.render('index', { projects });
});

app.get('/about', (req, res) => {

        res.render('about');
});

    app.get('/projects/:id', (req, res) => {
        const projectId = req.params.id;
        const project = projects.find( ({ id }) => id === +projectId );
        
        if (project) {
          res.render('project', { project });
        } else {
          res.sendStatus(404);
        }
      });

      app.listen(3000, () => {
        console.log('Hear you loud and clear on localhost:3000!')
    });

