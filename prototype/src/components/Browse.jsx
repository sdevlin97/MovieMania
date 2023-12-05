import Card from "./Card";
import axios from 'axios';
import { useState, useEffect } from 'react';

function Browse() {
  const [movieIdsML, setMovieIdsML] = useState([]); // Array of objects [key (ML movieid): doc_count (# of instances)] - Movieids returned from searching with tagsSelected
  const [movieIdsTMDb, setMovieIdsTMDb] = useState([]); // Array of objects including ID for TMDb
  const [movieIdsTEMP, setMovieIdsTEMP] = useState([]); // Temp duplicate of movieIdsTMDb, in case we later need the full list to still be preserved
  const [movieInfoTMDb, setMovieInfoTMDb] = useState([]); // Array of objects - Info for movies from TMDb
  const [movieInfoTMDbAction, setMovieInfoTMDbAction] = useState([]); // Array of objects - Info for movies from TMDb
  const [movieInfoTMDbAnimation, setMovieInfoTMDbAnimation] = useState([]); // Array of objects - Info for movies from TMDb
  const [movieInfoTMDbComedy, setMovieInfoTMDbComedy] = useState([]); // Array of objects - Info for movies from TMDb
  const [movieInfoTMDbFantasy, setMovieInfoTMDbFantasy] = useState([]); // Array of objects - Info for movies from TMDb
  const [movieInfoTMDbHorror, setMovieInfoTMDbHorror] = useState([]); // Array of objects - Info for movies from TMDb
  const [movieInfoTMDbRomance, setMovieInfoTMDbRomance] = useState([]); // Array of objects - Info for movies from TMDb
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Optionally, track any errors
  const [counter, setCounter] = useState(1); // Counter

  const containerStyle = {
    backgroundImage: `url('./pawel-czerwinski-XM1YUUVXj64-unsplash.jpg')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
  };

  const tagsSelected = [
    {key: "action"},
    {key: "animation"},
    {key: "comedy"},
    {key: "fantasy"},
    {key: "horror"},
    {key: "romance"},
  ];
  const [tagsSelectedTEMP, setTagsSelectedTEMP] = useState(tagsSelected); // Array of strings - Tags that have been selected

  // Trigger for when tagsSelectedTEMP is changed
  // Loads returns ML movieids based on current head tag
  useEffect(() => {
    setMovieInfoTMDb([]);
    
    // Elastic won't accept blank search inputs, so if blank = load default tags
    if (!tagsSelectedTEMP.length == 0) {

      // Sends list of selected tags to Elasticsearch to search, sets returned list of objects (movieid) to movieIdsML
      const fetchMLIds = () => {

        // Call to Elastic and set
        const results = {
          method: 'GET',
          url: 'https://us-central1-moviemania-ba604.cloudfunctions.net/app/fetchMLIds',
          params: {
            tags: tagsSelectedTEMP[0].key
          }
        };
        axios
          .request(results)
          .then((response) => {
            console.log(response.data);
            setMovieIdsML(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      };

      fetchMLIds();
    }
  }, [tagsSelectedTEMP]);

  // Trigger for when movieIdsML is changed
  // Uses movieids in movieIdsML to search for TMDb movieIds and set to movieIdsTMDb, duplicated to movieIdsTEMP for loop-removing ids later
  useEffect(() => {
    
    // Elastic won't accept blank search inputs, so if blank = do nothing
    if (!movieIdsML.length == 0) {
            
      // Calls Elasticsearch for tags associated with movieids, sets returned list of objects (tag) to setTagsAvailable
      const fetchTMDbIds = () => {
        
        // Create string for parameter transfer as we're transferring multiple items under the same parameter name
        var stringMovieIds = "";
        for (const value of movieIdsML) {
          stringMovieIds = stringMovieIds + value.key + " ";
        }

        // Call to Elastic and set
        const results = {
          method: 'GET',
          url: 'https://us-central1-moviemania-ba604.cloudfunctions.net/app/fetchTMDbIds',
          params: {
            movieids: stringMovieIds
          }
        };
        axios
          .request(results)
          .then((response) => {
            console.log(response.data);
            setMovieIdsTMDb(response.data);
            setMovieIdsTEMP(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      };

      fetchTMDbIds();
    }
  }, [movieIdsML]);

  // Trigger for when movieIdsTEMP is changed
  // Uses TMDb movieids in movieIdsTEMP to return movie info details from TMDb
  useEffect(() => {
        
    if (!movieIdsTEMP.length == 0) {
      
      // Call to TMDb and set
      async function fetchTMDbMovieInfo() {
        try {
          const response = await fetch(
            `https://us-central1-moviemania-ba604.cloudfunctions.net/app/movieDetails/${movieIdsTEMP[0]._source.tmdbId}`
          );
    
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const result = await response.json();
          console.log("The movie details we got is: ", result);
          setMovieInfoTMDb([...movieInfoTMDb, result]);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      }      

      fetchTMDbMovieInfo();  
    }
    // This else hides an empty log when the page is initialized
    else {
      // This extra if hides an empty log when the page is initialized
      if (!movieInfoTMDb.length == 0) {
        console.log("TMDb Movie Info: ", movieInfoTMDb);
        
        // Don't judge me >_>
        if (!tagsSelectedTEMP.length == 0) {
          switch(counter){
            case 1:
              setMovieInfoTMDbAction(movieInfoTMDb);
            case 2:
              setMovieInfoTMDbAnimation(movieInfoTMDb);
            case 3:
              setMovieInfoTMDbComedy(movieInfoTMDb);
            case 4:
              setMovieInfoTMDbFantasy(movieInfoTMDb);
            case 5:
              setMovieInfoTMDbHorror(movieInfoTMDb);
            case 6:
              setMovieInfoTMDbRomance(movieInfoTMDb);
          }
          setCounter(counter+1);
          setTagsSelectedTEMP(tagsSelectedTEMP.filter((m) => m !== tagsSelectedTEMP[0]));
        }
      }
    }    
  }, [movieIdsTEMP]);
  
  // Trigger for when movieInfoTMDb is changed
  // Filters out previously searched movieId
  // This unfortunate loop between movieIdsTEMP and movieInfoTMDB is due to the setMovieInfoTMDb not saving until it's left the useEffect
  useEffect(() => {
         
    // This if hides an empty log when the page is initialized
    if (!movieIdsTEMP.length == 0) {
      setMovieIdsTEMP(movieIdsTEMP.filter((m) => m !== movieIdsTEMP[0]));
    }
    
  }, [movieInfoTMDb]);

  return (
    <>
      <div style={containerStyle} className="relative bg-black">
        <div className="backdrop-blur ">
          <h1 className="tracking-[.50em] font-bold text-center text-[30px] text-white">
            Action
          </h1>
          <Card
            movieInfoTMDb={movieInfoTMDbAction}
          />
        </div>
        <div className="backdrop-blur ">
          <h1 className="tracking-[.50em] font-bold text-center text-[30px] text-white">
            Animation
          </h1>
          <Card
            movieInfoTMDb={movieInfoTMDbAnimation}
          />
        </div>
        <div className="backdrop-blur ">
          <h1 className="tracking-[.50em] font-bold text-center text-[30px] text-white">
            Comedy
          </h1>
          <Card
            movieInfoTMDb={movieInfoTMDbComedy}
          />
        </div>
        <div className="backdrop-blur ">
          <h1 className="tracking-[.50em] font-bold text-center text-[30px] text-white">
            Fantasy
          </h1>
          <Card
            movieInfoTMDb={movieInfoTMDbFantasy}
          />
        </div>
        <div className="backdrop-blur ">
          <h1 className="tracking-[.50em] font-bold text-center text-[30px] text-white">
            Horror
          </h1>
          <Card
            movieInfoTMDb={movieInfoTMDbHorror}
          />
        </div>
        <div className="backdrop-blur ">
          <h1 className="tracking-[.50em] font-bold text-center text-[30px] text-white">
            Romance
          </h1>
          <Card
            movieInfoTMDb={movieInfoTMDbRomance}
          />
        </div>
      </div>
    </>
  );
}

export default Browse;
