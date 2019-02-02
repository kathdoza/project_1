$(document).ready(function () {

    $("#add-food").on("click", function (event) {
        event.preventDefault();

        //this gets the options for different recipes
        var ingredient = $("#search-bar").val().trim();
        var foods = [];
        var queryURL = "https://www.food2fork.com/api/search?key=9727f5c2adff51679a6bf7e93ae216f6&q=" + ingredient + "&sort=r";
        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // console.log(typeof response);
            $(".jumbotron").empty();
            var result = JSON.parse(response);
            console.log(result);

            for (var i = 0; i < result.recipes.length; i++) {
                var title = result.recipes[i].title;
                console.log(title);
                
                var newDiv = $("<div>");

                newDiv.append("<p class='choices'>" + title + "</p>");

                $(".jumbotron").prepend(newDiv);
                

            }

        });
    });
    // $(document).on("click", "#add-food", getIngredient);

})
