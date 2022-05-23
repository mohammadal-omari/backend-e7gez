const mongoose = require('mongoose');

const MainCategorySchema = mongoose.Schema({
    name: { type: String, default: 'name', required: true },
    categoryNumber: { type: String, required: true, index: { unique: true } },
}, { collection: 'MainCategory' });

module.exports = mongoose.model('MainCategory', MainCategorySchema)
