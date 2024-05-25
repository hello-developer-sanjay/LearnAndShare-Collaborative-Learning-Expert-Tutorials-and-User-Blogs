const mongoose = require('mongoose');
const slugify = require('slugify');

const BulletPointSchema = new mongoose.Schema({
    text: String,
    image: String,
    video: String, // Add video field to BulletPointSchema
    codeSnippet: String // Add code snippet field to BulletPointSchema
});

const SubtitleSchema = new mongoose.Schema({
    title: String,
    bulletPoints: [BulletPointSchema],
    image: String,
    video: String // Add video field to SubtitleSchema
});

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    titleImage: String,
    content: {
        type: String,
        required: true
    },
    titleVideo: String,
    author: {
        type: String,
        required: true
    },
    subtitles: [SubtitleSchema],
    summary: {
        type: String
    },
    category: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    completed: {
        type: Boolean,
        default: false
    }
});

PostSchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = slugify(this.title, { lower: true, remove: /[*+~.()?,'"!:@]/g });
    }
    next();
});

module.exports = mongoose.model('Post', PostSchema);
