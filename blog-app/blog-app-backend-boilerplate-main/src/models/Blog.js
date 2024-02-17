const mongooose = require('mongoose');

const blogSchema = new mongooose.Schema({
    topic:String,
    description:String,
    posted_at:Date,
    posted_by:String
})

const Blog = mongooose.model('blogs', blogSchema);

module.exports = Blog;