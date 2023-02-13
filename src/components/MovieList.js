import React,{useEffect, useState,useContext} from 'react'
import Favoraties from './Favoraties'
import "./Movies.css"
import Usecontext, { context } from '../hooks/Usecontext';
import { FaStar,FaRegEye,FaHeart,FaBookReader } from "react-icons/fa";


export default function MovieList() {
    
    const {movies,removeFav,addfav,setMovies,category,AddToCard,searchValue,cartIteam,} = useContext(context);

  const [newMoviews, setNewMoviews] = useState([{
    id: "",
    liked: false
  }]);

  useEffect(() => {
    
    setNewMoviews(movies.map((movie) => {
      return {
        ...movie,
        liked: false,
      }
    }))

  }, [movies])
  

  const api=`https://api.themoviedb.org/3/movie/${category}?api_key=e7b12004b75308c7c4a6e84c00d2477e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${cartIteam}&with_watch_monetization_types=flatrate`
  useEffect(() => {
    fetch(api)
    .then((response) => response.json())
    .then((actualData) =>setMovies(actualData.results));
  
  },[setMovies, category, cartIteam, searchValue,api]);

  function handleLike(id) {
  
    const newMovies = movies.map((movie) => {
      if (movie.id === id) {
        return {
          ...movie,
          liked: true,
        }
      }
      return movie
    })
    setMovies(newMovies)
  }
  function handleDislike(id) {

    const newMovies = movies.map((movie) => {
      if (movie.id === id) {
        return {
          ...movie,
          liked: false,
        }
      }
      return movie
    })
    setMovies(newMovies)
  }
  
  return (
    
    
    <div className='movies'>
    {    movies.map((movie,index)=>(
      
      
      
      <div className='iteams' key={index}>
 
    <img src={`https://image.tmdb.org/t/p/original${
      movie.backdrop_path!==null
      ? movie.backdrop_path
      : [
        movie.poster_path!==null
        ?   movie.poster_path
        :null
      ]
      // movie.poster_path==null?movie.backdrop_path:movie.poster_path
    }`} style={{transition:"all 1s"}} />

        
          <div className="alltext ">
          <div className="info">
        <h1>{movie.original_title}</h1>
        <div className='raiting'><p>{movie.vote_average}</p>  <FaStar className='starIcone'/> </div>
        
      <div className='icons'>
      
               <div onClick={()=>{addfav(movie)}}>
                
      <FaHeart className='dll'  
  
  style={{
    color: movie.liked ? "red" : "white",
  }}
  onClick={ 
    movie.liked ? () => handleDislike(movie.id) : () => handleLike(movie.id)
    
}    

        />
               </div>
      <FaRegEye className='chaw'/>
      </div>
      </div>
      </div>
      </div>
    
    ))
}


    </div>
  
  )
}
