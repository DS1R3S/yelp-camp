const mongoose = require('mongoose')



const campgroundSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    image: {
        type: String,
    },
    description: {
        type: String,
    },
});




module.exports = mongoose.model('Campground', campgroundSchema)