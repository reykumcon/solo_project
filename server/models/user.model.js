const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'First name is required.'],
        },

        lastName: {
            type: String,
            required: [true, 'Last name is required.'],
        },

        email: {
            type: String,
            required: [true, 'Email is required.'],
            validate: {
                validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
                message: "Please enter a valid email."
            },
        },

        password: {
            type: String,
            required: [true, 'Password is required.'],
            minLength: [8, 'Password should be at least 8 characters long.'],
        },

    },
    { timestamps: true }
);

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set((val => (this._confirmPassword = val)));

UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Passwords must match.');
    }
    next();
});

UserSchema.pre('save', function (next) {
    bcrypt
        .hash(this.password, 10)
        .then((hash) => {
            this.password = hash;
            next();
        })
        .catch((err) => console.log(err));
});

UserSchema.virtual('projectsSubmitted', {
    ref: 'Project',
    localField: '_id',
    foreignField: 'user_id',
});

UserSchema.set('toObject', { virtuals: true });
UserSchema.set('toJSON', { virtuals: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;
