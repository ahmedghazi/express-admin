// Example model

var mongoose = require('mongoose'),
  	Schema = mongoose.Schema;

var UsersSchema = new Schema({
    type: String,
    email: {
        unique: true,
        index: true,
        type: String
    },
    password: String,
    first_name: String,
    last_name: String,
    adresse: String,
    age: Number,
    dossard: String
},{
    timestamps: true
});

mongoose.model('Users', UsersSchema);

