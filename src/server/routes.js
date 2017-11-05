const express = require('express');
const router = express.Router();

const recipeService = require('./recipe.service');

router.get('/recipes',(req,res)=>{
    recipeService.getRecipes(req,res)
    });
    
    router.post('/recipe',(req,res)=>{
        recipeService.postRecipe(req,res)
    });
    
    
    router.put('/recipe/:id',(req,res)=>{
        recipeService.putRecipe(req,res)
    });
    
    
    router.delete('/recipe/:id',(req,res)=>{
        herrecipeServiceoService.deleteRecipe(req,res)
    });

module.exports = router;