import React, { useRef } from "react";
import styles from "./movie-search-box.module.css";
import notAvailableImg from "../../assets/img/image_not_available.png";

const MovieSearch = () => {
    // https://www.omdbapi.com/?s=thor&page1&apikey=a68d41f3
    // https://www.omdbapi.com/?i=tt3896198&apikey=a68d41f3
    // get movies from API
    const movieSearchBox = useRef(null);
    const searchList = useRef(null);
    const resultGrid = useRef(null);
    const loadMovies = async (searchTerm) => {
        const URL = `https://www.omdbapi.com/?s=${searchTerm}&page1&apikey=a68d41f3`;
        const res = await fetch(URL);
        const data = await res.json();
        if (data.Response) displayMovieList(data.Search);
    };
    const findMovies = () => {
        let searchTerm = movieSearchBox.current.value.trim();
        if (searchTerm.length > 0) {
            searchList.current.classList.remove(`${styles.hideSearchList}`);
            loadMovies(searchTerm);
        } else {
            searchList.current.classList.add(`${styles.hideSearchList}`);
        }
    };
    const displayMovieList = (movies) => {
        searchList.current.innerHTML = "";
        for (let i = 0; i < movies.length; i++) {
            let movieListItem = document.createElement("div");
            let moviePoster;
            movieListItem.dataset.id = movies[i].imdbID;
            movieListItem.classList.add(`${styles.searchListItem}`);
            if (movies[i].Poster != "N/A") {
                moviePoster = movies[i].Poster;
            } else {
                moviePoster = notAvailableImg;
            }

            movieListItem.innerHTML = `
            <div class="${styles.searchItemThumbnail}">
                <img
                src="${moviePoster}"/>
            </div>
            <div class="${styles.searchItemsInfo}">
                <h5>${movies[i].Title}</h5>
                <p>${movies[i].Year}</p>
            </div>
            `;

            searchList.current.appendChild(movieListItem)
        }
        loadMovieDetails();
    };
    const loadMovieDetails = () => {
        const searchListMovies = document.querySelectorAll(`.${styles.searchListItem}`);
        searchListMovies.forEach(movie => {
            movie.addEventListener("click", async ()=> {
                searchList.current.classList.add(`${styles.hideSearchList}`)
                movieSearchBox.current.value = "";
                const result = await fetch(`https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=a68d41f3`);
                const movieDetails = await result.json();
                displayMovieDetails(movieDetails)
            })
        })
    }
    const displayMovieDetails = (details) => {
        resultGrid.current.innerHTML = `
        <div class="${styles.moviePoster}">
        <img
            src="${(details.Poster != "N/A") ? details.Poster : notAvailableImg}"
            alt='image of the movie you searched for'
        />
    </div>
    <div class="${styles.movieInfo}">
        <h3 class="${styles.movieTitle}">
            ${details.Title}
        </h3>
        <ul class="${styles.movieMiscInfo}">
            <li class="${styles.year}">Year: ${details.Year}</li>
            <li class="${styles.rated}">
                Ratings: ${details.Rated}
            </li>
            <li class="${styles.released}">
                Released: ${details.Released}
            </li>
        </ul>
        <p class="${styles.genre}">
            <b>Genre:</b> ${details.Genre}
        </p>
        <p class="${styles.writers}">
            <b>Writers:</b> ${details.Writer}
        </p>
        <p class="${styles.actors}">
            <b>Actors:</b> ${details.Actors}
        </p>
        <p class="${styles.plot}">
            <b>Plot:</b> ${details.Plot}
        </p>
        <p class="${styles.language}">
            <b>Lenguage:</b> ${details.Language}
        </p>
        <p class="${styles.awards}">
            <b>
                <i class= "fas fa-award"></i>
            </b>
            ${details.Awards}
        </p>
    </div>
        `;
    }
    window.addEventListener("click", (e) => {
        if(e.target.className != `${styles.formControl}`) {
            searchList.current.classList.add(`${styles.hideSearchList}`);
        }
    })

    return (
        <>
            <div className={styles.wrapper}>
                {/* LOGO */}

                <div className={styles.logo}>
                    <h1>Movies Search</h1>
                </div>
                {/* SEARCH CONTAINER */}

                <div className={styles.searchContainer}>
                    <div className={styles.searchElement}>
                        <h3>Search Movie:</h3>
                        <input
                            type='text'
                            className={styles.formControl}
                            placeholder='Search Movie Title'
                            ref={movieSearchBox}
                            onKeyUp={findMovies}
                            onClick={findMovies}
                        />
                        <div className={styles.searchList} ref={searchList}>
                            <div className={styles.searchListItem}></div>
                        </div>
                    </div>
                </div>
                {/* RESULT CONTAINER */}

                <div className={styles.container}>
                    <div className={styles.resultContainer}>
                        <div className={styles.resultGrid} ref={resultGrid}>
                            {/* MOVIE INFORMATION */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MovieSearch;
