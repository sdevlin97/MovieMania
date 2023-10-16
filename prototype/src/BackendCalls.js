import $ from "jquery";

  export function getPopularMovies() {
    $.ajax({
      url: `https://us-central1-moviemania-ba604.cloudfunctions.net/app/popularMovies`,
      crossOrigin: true,
      type: "GET",
      async: true,
      success: function (response) {
        processMovieData(response);
        return movieDataList;
      },
      error: function (error) {
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