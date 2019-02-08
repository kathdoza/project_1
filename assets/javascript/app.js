$(document).ready(function () {
var apiKey = "e61b4cdb21fa49a0a22d6e7a8f319240";

    $("#add-food").on("click", function (event) {
        event.preventDefault();

        //this gets the options for different recipes
        var ingredient = $("#search-bar").val().trim();
        var queryURL = "https://www.food2fork.com/api/search?key=" + apiKey + "&q=" + ingredient + "&sort=r&page=2";
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            $(".jumbotron").empty();
            var result = JSON.parse(response);
            console.log(result);

            for (var i = 0; i < result.recipes.length; i++) {
                var buttonTitle = result.recipes[i].title;
                console.log(buttonTitle);
                var recipeID = result.recipes[i].recipe_id;
                // console.log(recipeID);
                var newButton = $("<button>").attr("class", "choices").text(buttonTitle);
                newButton.attr("data-recipe", recipeID)
                $(".jumbotron").prepend(newButton);
            }
        });
    });
    // gets recipe ID to get recipes for user's choice on F2F
    $(document).on("click", ".choices", getRecipes);

    var calories = 0;
    var cholesterol = 0;
    var dietaryFiber = 0;
    var totalFat = 0;
    var satFat = 0;
    var sodium = 0;
    var carbs = 0;
    var sugars = 0;

    function getRecipes() {
        var recipeID = $(this).attr("data-recipe");
        console.log(recipeID);
        var queryURL = "https://www.food2fork.com/api/get?key=" + apiKey + "&rId=" + recipeID + "&sort=r";

        $.ajax({
            url: queryURL,
            method: "GET"

        }).then(function (response) {
            var result = JSON.parse(response);
            console.log(result);
            var imageURL = result.recipe.image_url;
            var ingredients = result.recipe.ingredients;
            
            $.ajax({
                url: "https://trackapi.nutritionix.com/v2/natural/nutrients",
                headers: {
                    'Content-Type': 'application/json',
                    'x-app-id': '9d90687a',
                    'x-app-key': 'ce2d2319cdcd23cd6bf1f7cc07da62b9',
                    'x-remote-user-id': 0
                },
                data: JSON.stringify({
                    query: ingredients.join(', ')
                }),
                method: "POST"
            }).done(function(response) {
                console.log(response.foods)
                for (var i=0; i < response.foods.length; i++) {
                    calories = parseInt(calories + response.foods[i].nf_calories);
                    cholesterol = parseInt(cholesterol + response.foods[i].nf_cholesterol);
                    dietaryFiber = parseInt(dietaryFiber + response.foods[i].nf_dietary_fiber);
                    totalFat = parseInt(totalFat + response.foods[i].nf_total_fat);
                    satFat = parseInt(satFat + response.foods[i].nf_saturated_fat);
                    sodium = parseInt(sodium + response.foods[i].nf_sodium);
                    carbs = parseInt(carbs + response.foods[i].nf_total_carbohydrate);
                    sugars = parseInt(sugars + response.foods[i].nf_sugars);
                }
                console.log(calories, cholesterol, dietaryFiber, totalFat, satFat, sodium, carbs, sugars);
                $(".jumbotron").empty();
                $("#recipe-nutrition").html("<h3>Nutrition Facts:</h3><h4>Calories:</h4>" + calories
                + "<h4>Total Fat:</h4>" + totalFat
                + "<h4>Saturated Fat:</h4>" + satFat
                + "<h4>Cholesterol:</h4>" + cholesterol
                + "<h4>Sodium:</h4>" + sodium
                + "<h4>Total Carbohydrates:</h4>" + carbs
                + "<h4>Dietary Fiber:</h4>" + dietaryFiber
                + "<h4>Sugars:</h4>" + sugars);
            });
        });
    };
    // $(document).on("click", "#add-food", getIngredient);
    // $("#choices").on("click", function () {

    // })
    function ingredientsCall() {
    $.ajax({
        url: "https://trackapi.nutritionix.com/v2/natural/nutrients",
        headers: {
            "x-app-id": "9d90687a",
            "x-app-key": "ce2d2319cdcd23cd6bf1f7cc07da62b9",
            "x-remote-user-id": 0
        },
        "query": "chicken",
        method: "POST"
    }).then(function(response) {;
        var ingredientResponse = JSON.parse(response);
        console.log(ingredientResponse);
    })
    }
});
