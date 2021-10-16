const ProjectController = require('../controllers/project.controller');
const { authenticate } = require('../config/jwt.config');
const { upload } = require('../middleware/upload');

module.exports = (app) => {
    app.post('/api/projects', upload.single('file'), ProjectController.create);
    app.get('/api/projects', ProjectController.getAll);
    app.get('/api/projects/:id', ProjectController.getOne);
    app.put('/api/projects/:id', ProjectController.update);
    app.delete('/api/projects/:id', ProjectController.delete);
}