const mongoose = require('mongoose');
/**
 * Set to Node.js native promises
 * Per http://mongoosejs.com/docs/promises.html
 */
mongoose.Promise = global.Promise;

const env = require('./env/environment');

// eslint-disable-next-line max-len
const mongoUri = 'mongodb://my-cosmos-recipes:Qlr1LfTISJfLqalInKsjxXUPsd35oCGGXXzAZiGTbYIv96wXaL8EGr5A35XKcVkRklceJI667leAg3YkgvIeeA==@my-cosmos-recipes.documents.azure.com:10255/?ssl=true&replicaSet=globaldb';

function connect ()
{
    mongoose.set('debug', true);
    return mongoose.connect(mongoUri,{useMongoClient:true});
}

module.exports = {
    connect,
    mongoose
};