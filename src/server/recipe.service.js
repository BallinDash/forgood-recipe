const Recipe = require('./recipe.model');
const ReadPreference = require('mongodb').ReadPreference;

require('./mongo').connect();

function getRecipes(req, res) {
  const docquery = Recipe.find({}).read(ReadPreference.NEAREST);
  docquery
    .exec()
    .then(recipes => {
      res.status(200).json(recipes);
    })
    .catch(error => {
      res.status(500).send(error);
      return;
    });
}

function postRecipe(req, res) {
  const originalRecipe = { id: req.body.id, name: req.body.name, saying: req.body.saying };
  const recipe = new Recipe(originalRecipe);
  recipe.save(error => {
    if (checkServerError(res, error)) return;
    res.status(201).json(recipe);
    console.log('Recipe created successfully!');
  });
}

function putRecipe(req, res) {
  const originalRecipe = {
    id: parseInt(req.params.id, 10),
    name: req.body.name,
    saying: req.body.saying
  };
  Recipe.findOne({ id: originalRecipe.id }, (error, recipe) => {
    if (checkServerError(res, error)) return;
    if (!checkFound(res, recipe)) return;

    recipe.name = originalRecipe.name;
    recipe.saying = originalRecipe.saying;
    recipe.save(error => {
      if (checkServerError(res, error)) return;
      res.status(200).json(recipe);
      console.log('Recipe updated successfully!');
    });
  });
}

function deleteRecipe(req, res) {
  const id = parseInt(req.params.id, 10);
  Recipe.findOneAndRemove({ id: id })
    .then(recipe => {
      if (!checkFound(res, recipe)) return;
      res.status(200).json(recipe);
      console.log('Recipe deleted successfully!');
    })
    .catch(error => {
      if (checkServerError(res, error)) return;
    });
}

function checkServerError(res, error) {
  if (error) {
    res.status(500).send(error);
    return error;
  }
}

function checkFound(res, recipe) {
  if (!recipe) {
    res.status(404).send('Recipe not found.');
    return;
  }
  return recipe;
}

module.exports = {
  getRecipes,
  postRecipe,
  putRecipe,
  deleteRecipe
};