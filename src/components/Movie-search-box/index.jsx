import React, { useRef } from "react";
import styles from "./movie-search-box.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAward } from "@fortawesome/free-solid-svg-icons";

const MovieSearch = () => {
    // https://www.omdbapi.com/?s=thor&page1&apikey=a68d41f3
    // https://www.omdbapi.com/?i=tt3896198&apikey=a68d41f3
    // get movies from API
    const movieSearchBox = useRef(null)
    const searchList = useRef(null)
    const resultGrid = useRef(null)
    const loadMovies = async (searchTerm) => {
        const URL = `https://www.omdbapi.com/?s=${searchTerm}&page1&apikey=a68d41f3`;
        const res = await fetch(URL);
        const data = await res.json();
        if (data.Response) displayMovieList(data.Search);
    };
    const findMovies = () => {
        let searchTerm = (movieSearchBox.current.value).trim();
        if(searchTerm.length > 0) {
            searchList.current.classList.remove("hideSearchList")
            // console.log(searchList.current.classList);
            loadMovies(searchTerm)
        } else {
            searchList.current.classList.add("hideSearchList")
        }
        console.log(searchTerm);
    }
    const displayMovieList = (movies) => {
        searchList.current.innerHTML = "";
        for(let i = 0; i < movies.length; i++ ) {
            let movieListItem = document.createElement("div");
            movieListItem.dataset.id = movies[i].imdbID;
            movieListItem.classList.add("searchListItem")
            console.log(movieListItem);
        }
    };
    
    return (
        <>
            {/* <FontAwesomeIcon icon={faBell}/> */}
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
                        />
                        <div className={styles.searchList} ref={searchList}>
                            <div className={styles.searchListItem}>
                                <div className={styles.searchItemThumbnail}>
                                    <img
                                        src='https://assets-prd.ignimgs.com/2023/02/13/guardians-of-the-galaxy-vol-three-newbutton-1676306275720.jpg'
                                        alt=''
                                    />
                                </div>
                                <div className={styles.searchItemsInfo}>
                                    <h5>Guardians Of The Galaxy</h5>
                                    <p>2017</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* RESULT CONTAINER */}

                <div className={styles.container}>
                    <div className={styles.resultContainer}>
                        <div className={styles.resultGrid} ref={resultGrid}>
                            {/* MOVIE INFORMATION */}

                            <div className={styles.moviePoster}>
                                <img
                                    src='https://assets-prd.ignimgs.com/2023/02/13/guardians-of-the-galaxy-vol-three-newbutton-1676306275720.jpg'
                                    alt='image of the movie you searched for'
                                />
                            </div>
                            <div className={styles.movieInfo}>
                                <h3 className={styles.movieTitle}>
                                    Guardians of The galaxy
                                </h3>
                                <ul className={styles.movieMiscInfo}>
                                    <li className={styles.year}>Year: 2017</li>
                                    <li className={styles.rated}>
                                        Ratings: PG-13
                                    </li>
                                    <li className={styles.released}>
                                        Released: 05 May 2017
                                    </li>
                                </ul>
                                <p className={styles.genre}>
                                    <b>Genre:</b> Action, Adventure, Comedy
                                </p>
                                <p className={styles.writers}>
                                    <b>Writers:</b> James Gunn, Adventure,
                                    Comedy
                                </p>
                                <p className={styles.actors}>
                                    <b>Actors:</b> Chriss Patt, Adventure,
                                    Comedy
                                </p>
                                <p className={styles.plot}>
                                    <b>Plot:</b> The guardians of the galaxy
                                    struggle to keep together as a team
                                </p>
                                <p className={styles.language}>
                                    <b>Lenguage:</b> English
                                </p>
                                <p className={styles.awards}>
                                    <b>
                                        <FontAwesomeIcon
                                            icon={faAward}
                                            className={styles.icon}
                                        />
                                    </b>{" "}
                                    Nominated for 1 Oscar
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MovieSearch;
