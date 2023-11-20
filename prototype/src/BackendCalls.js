import $ from "jquery";

export async function testBackendCall() {
    $.ajax({
      url: `https://us-central1-moviemania-ba604.cloudfunctions.net/app/test`,
      crossOrigin: true,
      type: "POST",
      async: true,
      success: function (response) {
        console.log("We've made a sucessful post request!");
        console.log("The response is: ", response);
        return response;
      },
      error: function (error) {
        console.log("Something went wrong with our test");
        console.log("The error is: ");
        console.log(error);
      },
    });
  }

  export async function testMovieBackendCall() {
    $.ajax({
      url: `https://us-central1-moviemania-ba604.cloudfunctions.net/app/movieTest`,
      crossOrigin: true,
      type: "GET",
      async: true,
      success: function (response) {
        console.log("We've made a sucessful get request!");
        console.log("The response is: ", response);
      },
      error: function (error) {
        console.log("Something went wrong with our test");
        console.log("The error is: ");
        console.log(error);
      },
    });
  }
  

  // Keeping this in case I need to add more database functionality

  /*
  export async function testDatabaseRequest() {
    try {
      const docRef = await addDoc(collection(db, "movies"), {
        title: "Blade Runner",
        release_date: "06/25/1982",
        rating: 8.1,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  */
