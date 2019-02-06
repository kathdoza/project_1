$(document).ready(function () {

    $("#add-food").on("click", function (event) {
        event.preventDefault();

        //this gets the options for different recipes
        var ingredient = $("#search-bar").val().trim();
        var foods = [];
        var queryURL = "https://www.food2fork.com/api/search?key=9727f5c2adff51679a6bf7e93ae216f6&q=" + ingredient + "&sort=r&page=2";
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // console.log(typeof response);
            $(".jumbotron").empty();
            var result = JSON.parse(response);
            console.log(result);

            for (var i = 0; i < 10; i++) {
                var title = result.recipes[i].title;
                console.log(title);
                var recipeID = result.recipes[i].recipe_id;
                // console.log(recipeID);
                var newDiv = $("<div>");

                newDiv.append("<div class='choices' data-recipe='" + recipeID + "'>" + title + "</div>");

                $(".jumbotron").prepend(newDiv);
            }

        });
    });
    $(document).on("click", ".choices", getRecipes);

    function getRecipes () {
        var recipe = $(this).attr("data-recipe");
        console.log(recipe);

        var queryURL = "https://www.food2fork.com/api/get?key=9727f5c2adff51679a6bf7e93ae216f6&rId=" + recipe + "&sort=r";

        $.ajax({
            url:queryURL,
            method: "GET"
        }).then(function(response) { 
            
        })
    };
 
    // $(document).on("click", "#add-food", getIngredient);
    // $("#choices").on("click", function () {

    // })
});
