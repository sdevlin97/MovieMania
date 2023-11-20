import $ from "jquery";

export function fetchMoviePosters() {
    $.ajax({
      url: `https://us-central1-moviemania-ba604.cloudfunctions.net/app/fetchMoviePosters`,
      crossOrigin: true,
      type: "GET",
      async: true,
      success: function (response) {
        console.log("We've made a sucessful post request!");
        console.log("The response is: ", response);
      },
      error: function (error) {
        console.log("Something went wrong with our test");
        console.log("The error is: ");
        console.log(error);
      },
    });
  }