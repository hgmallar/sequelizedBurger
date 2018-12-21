// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function () {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newId;

    //When the submit button is clicked for user
    $(".user-form").on("submit", function (event) {
        var ids = [];
        $.each($("input[type='checkbox']:checked"), function () {
            ids.push($(this).val());
        });

        //get the new user name
        var newEater = {
            name: $("#usr").val().trim(),
        };

        // Send the POST request to create the new eater
        $.ajax("/api/eaters", {
            type: "POST",
            data: newEater
        }).then(function (eaterInfo) {
            console.log("created new eater");

            for (i = 0; i < ids.length; i++) {
                //changed the devoured state to true and change the eater_id from null to the id of the eater just created
                var newDevouredState = {
                    devoured: true,
                    eater_id: eaterInfo.id
                };

                // Send the PUT request to update the burger
                $.ajax("/api/burgers/" + ids[i], {
                    type: "PUT",
                    data: newDevouredState
                }).then(
                    function () {
                        console.log("changed devoured to true");
                    }
                );
            }

        });

    });

    //When the submit button is clicked for burger
    $(".create-form").on("submit", function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();

        //get the new burger name
        var newBurger = {
            burger_name: $("#burg").val().trim(),
        };

        // Send the POST request.
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function () {
                console.log("created new burger");
                // Reload the page to get the updated list
                location.reload();
            }
        );
    });
});