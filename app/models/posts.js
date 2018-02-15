// Example model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostsSchema = new Schema({
  title: String,
  url: String,
  text: String
});

PostsSchema.virtual('date')
  .get(() => this._id.getTimestamp());

mongoose.model('Posts', PostsSchema);

