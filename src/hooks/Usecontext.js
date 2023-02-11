import React, { createContext,useState,useEffect } from 'react';
export const context=createContext(null);
const Usecontext = (props) => {
  
  
  const [movies, setMovies] = useState([]);
  const [fav, setfav] = useState([]);
  const [searchValue, setsearchValue] = useState('');

//   const addfav = (movieid) => { 
//     setfav( (prev)=>({...prev,[movieid]:prev[movieid]+1 }))
//  }
const addfav=(movie)=>{
const favoratiess=[...fav,movie];
setfav(favoratiess);
}
const removeFav=(movie)=>{
  const remove=fav.filter((item)=>item.imdbID!==movie.imdbID)
  setfav(remove);
}
const popularMovies= async(e)=>{
  e.preventDefault();
  console.log("searching");
  try{
    

  // const url= `https://api.themoviedb.org/3/movie/popular?api_key=&language=en-US&page=1`
  const url= `https://api.themoviedb.org/3/movie/top_rated?api_key=e7b12004b75308c7c4a6e84c00d2477e&language=en-US&page=1`
  const res=await fetch(url);
  const data=await res.json();
  setMovies(data.results)
    }
  catch(e){
console.log(e)
  }
}


const values={movies,addfav,searchValue,setsearchValue,removeFav,fav,setMovies,popularMovies};
  return (
    <context.Provider value={values}>
      {props.children}
    </context.Provider>
  );
}

export default Usecontext;