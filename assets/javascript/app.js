$(document).ready(function () {

    $("#add-food").on("click", function(event) {
        event.preventDefault();
        var ingredient = $("#search-bar").val().trim();
        var queryURL = "https://www.food2fork.com/api/search?key=6085193110d842cc5f85203d6d4c5756&q=" + ingredient + "&sort=r";
        console.log(queryURL);
        
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            // console.log(response);

            var result = response.data;
            console.log(result);

        });
    });

    // $(document).on("click", "#add-food", getIngredient);

})
