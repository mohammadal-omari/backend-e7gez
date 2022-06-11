const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const MainCategorySchema = mongoose.Schema({
    name: { type: String, default: 'name', required: true },
    categoryNumber: { type: String, required: true, index: { unique: true } },
}, { collection: 'MainCategory' });


MainCategorySchema.plugin(autoIncrement.plugin,  {
    model: 'mainCategory',
    field: 'categoryNumber',
    startAt: (new Date()).getUTCFullYear()+40*2,
    incrementBy: 1
  })
module.exports = mongoose.model('MainCategory', MainCategorySchema)
