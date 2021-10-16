const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: [true, 'Project name is required.'],
        minlength: [5, 'Project name must be at least 5 characters long.']
    },

    projectNumber : {
        type: Number,
        required: [true, 'Project Number is required.']
    },
    
    storeNumber: {
        type: Number,
        required: [true, 'Store number is required.']
    },

    status: {
        type: String,
        required: [true, 'Project status required.']
    },

    file: {
        type: String,
    },

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

}, { timestamps: { createdAt: 'dateSubmitted', updatedAt: 'dateUpdated' } });

module.exports = mongoose.model("Project", ProjectSchema);