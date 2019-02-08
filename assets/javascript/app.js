$(document).ready(function () {

    $("#add-food").on("click", function (event) {
        event.preventDefault();

        //this gets the options for different recipes
        var ingredient = $("#search-bar").val().trim();
        var foods = [];
        var apiKey = "690178e9a1bd7c5314bc05fe6b77a9dd"
        var queryURL = "https://www.food2fork.com/api/search?key=" + apiKey + "&q=" + ingredient + "&sort=r&page=2";

        // console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            $(".jumbotron").empty();
            var result = JSON.parse(response);
            // console.log(result);

            for (var i = 0; i < 10; i++) {
                var buttonTitle = result.recipes[i].title;
                // console.log(buttonTitle);
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

    function getRecipes() {
        var recipe = $(this).attr("data-recipe");
        // console.log(recipe);

        var queryURL = "https://www.food2fork.com/api/get?key=6085193110d842cc5f85203d6d4c5756&rId=" + recipe + "&sort=r";
        // console.log(queryURL)
        $.ajax({
            url: queryURL,
            method: "GET"

        }).then(function (response) {
            var result = JSON.parse(response);
            // console.log(result);

            var imageURL = result.recipe.image_url;
            // console.log(imageURL);

            var ingredients = result.recipe.ingredients;
            // console.log(ingredients);
        })
    };

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
        }).then(function (response) {
            var ingredientResponse = JSON.parse(response);
            // console.log(ingredientResponse);
        })
    };

    $(document).on("click", ".choices", getMenuItem);

    function getMenuItem() {
        var menuItem = $(this).text();
        // console.log(menuItem);
        $.ajax({
            url: "https://trackapi.nutritionix.com/v2/search/instant",
            headers: {
                "x-app-id": "9d90687a",
                "x-app-key": "ce2d2319cdcd23cd6bf1f7cc07da62b9"
            },
            data: {
                query: menuItem,
                "branded": true,
                "branded_type": 1,
                "detailed": true,
                "common": false,
            }, 
            method: "POST"
        }).then(function (response) {
            var item = response;
            console.log(item);

            var i = Math.floor(Math.random() * 19);
            console.log(i);

            var restaurant = item.branded[i].brand_name;
            var menuItemName = item.branded[i].food_name;
            
            console.log(restaurant);
            console.log(menuItemName);

            var protein = item.brand[i].full_nutrients[0].value;
            var totalFat = item.brand[i].full_nutrients[1].value;
            var totalCarbohydrates = item.brand[i].full_nutrients[2].value;
            var calories = item.brand[i].full_nutrients[3].value;
            var sugars = item.brand[i].full_nutrients[4].value;
            var dietaryFiber = item.brand[i].full_nutrients[5].value;
            var sodium = item.brand[i].full_nutrients[6].value;
            var cholestrol = item.brand[i].full_nutrients[7].value;
            var transFat = item.brand[i].full_nutrients[8].value;
            var satFat = item.brand[i].full_nutrients[9].value;

            // var fullNurtients = item.branded[i].full_nutrients;
            // console.log(fullNurtients);

        });




    };

});
