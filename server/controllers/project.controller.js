const Project = require('../models/project.model');
const jwt = require('jsonwebtoken');

module.exports = {
    create: (req, res) => {
        const { title, projectNumber, storeNumber, status} = req.body;
        // const file = req.file.path;
        console.log(req.body);

        Project.create({
            title,
            projectNumber,
            storeNumber,
            status,
        })
            .then(project => res.json(project))
            .catch(err => res.status(400).json(err));
    },

    getAll: (req, res) => {
        Project.find({})
            .then(projects => res.json(projects))
            .catch(err => res.json(err));
    },

    getOne: (req, res) => {
        Project.findOne({_id: req.params.id})
            .then(project => res.json(project))
            .catch(err => res.json(err));
    },

    update: (req, res) => {
        Project.findOneAndUpdate(
                {_id: req.params.id},
                req.body,
                { runValidators: true, new: true }
            )
            .then(updatedProject => res.json(updatedProject))
            .catch(err => res.status(400).json(err));
    },

    delete: (req, res) => {
        Project.deleteOne({_id: req.params.id})
            .then(deletedProject => res.json(deletedProject))
            .catch(err => res.json(err));
    },
}