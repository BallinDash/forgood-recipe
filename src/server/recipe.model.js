const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const recipeSchema = new Schema({
    id: {type:Number,required:true,unique:true},
    name: String,
    description:String
},{
    collection:'recipes',
    read: 'nearest'
});
const Recipe = mongoose.model('Recipe',recipeSchema);
module.exports = Recipe;