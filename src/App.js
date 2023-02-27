import React, {useState, useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import api from "./api/axiosConfig";
import './App.css';
import Header from './components/header/Header';
import Home from './components/home/Home';

import Layout from './components/Layout';
import Reviews from './components/reviews/Reviews';
import Trailer from './components/trailer/Trailer';

function App() {

  const [movies, setMovies] = useState();
  const [movie, setMovie] = useState();
  const [reviews, setReviews] = useState();

  useEffect(() => {
    getMovies();
  }, [])

  const getMovies = async () => {
    try {
      const response = await api.get("/api/v1/movies");
      setMovies(response.data);
    } catch (error) {
      console.log(error);
    }
    
  }

  const getMovieData = async (movieId) => {
    
    try {

      const response = await api.get(`/api/v1/movies/${movieId}`);
      const singleMovie = response.data;
      setMovie(singleMovie);
      setReviews(singleMovie.reviewIds);

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path='/' exact element={<Layout />}>
          <Route path='/' element={<Home movies={movies} />} />
          <Route path='/trailer/:ytTrailerId' element={<Trailer />} />
          <Route path='/reviews/:movieId' element={<Reviews getMovieData={getMovieData} reviews={reviews} setReviews={setReviews} movie={movie} />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
