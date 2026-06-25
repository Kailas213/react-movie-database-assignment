import React , {useState, useMemo} from 'react';
import './BollywoodMovie.css';

const BollywoodMovie = [
    {
        id: 1,
        title: "3 Idiots",
        rating: 8.4,
        genre: "Comedy, Drama",
        year: 2009,
        director: "Rajkumar Hirani",
        cast: ["Aamir Khan", "R. Madhavan", "Sharman Joshi"],
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-CjXy5nSmZygvEe2lQVzaJx6pH2XDtwByMX_BsXZFjwlmjlrpTQdeg-hBqyb9FbK7aLyE&s=10",
    },
    {
        id: 2,
        title: "Bade Miyan Chote Miyan",
        rating: 8.9,
        genre: "Action",
        year: 2015,
        director: "Rajkumar Hirani",
        cast: ["Aamir Khan", "R. Madhavan", "Sharman Joshi"],
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnRk7TswsZzN8F4__fNP9waBRCp8Jg7RclSX3VGU46K_TsVgcmfn4AMOCAGZDMPlR9i9sfIw&s=10",          
    },
    {
        id: 3,
        title: "Fighter 2",
        rating: 9.2,
        genre: "Action",
        year: 2025,
        director: "Siddharth Anand ",
        cast: ["Hrithik Roshan", "Deepika Padukone", "Tiger Shroff"],   
        image: "https://i.ytimg.com/vi/6amIq_mP4xM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDkJZzueRSUASfCiZvoySlHKgGzNA",
    },
    {
        id: 4,
        title: "Bhramastra 2",
        rating: 9.3,
        genre: "Fantasy",
        year: 2023,
        director: "Ayan Mukerji",
        cast: ["Ranbir Kapoor", "Alia Bhatt", "Amitabh Bachchan"],   
        image: "https://preview.redd.it/according-to-the-latest-update-from-ranbir-kapoor-v0-hwq8fgdaamjg1.jpeg?width=640&crop=smart&auto=webp&s=d424f3938c475d255cde3d3a4c40193b87a5d429",
    },
    {
        id: 5,
        title: "Pushpa 2",
        rating: 6.2,
        genre: "Action",
        year: 2024,
        director: "Sukumar",
        cast: ["Allu Arjun", "Rashmika Mandanna", "Fahadh Faasil"],
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3I84wCRTf0lEnJBcXKdTnHGsKUUtptPZOKjar3x9F97SbbdInBh6oQ6j9eFo6c361C5iM&s=10",
    },
    {
        id: 6,
        title: "Chenai Express",
        rating: 7.8,
        genre: "Drama",
        year: 2020,
        director: "Rohit Shetty",
        cast: ["Shah Rukh Khan", "Deepika Padukone", "Priyanka Chopra"],  
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnEJ16Z73ldW9ge3ABLK2ltPMWPsjEn_2y3GPTH_oeDpL8V5S19v1Ay4J5A4OrO7jHN0Kt&s=10",  
    },
    {
        id: 7,
        title: "Dunki",
        rating: 8.5,
        genre: "Drama",
        year: 2023,
        director: "Rohit Shetty",
        cast: ["Shah Rukh Khan", "Deepika Padukone", "Priyanka Chopra"],
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxkby84bRNSkgl3IjPwQy1QaWyENYytNUn4h0jG4l4WJv3hV8VEh67Y_wFw9dgmrfSCVHWIw&s=10",
    },
    {
        id: 8,
        title: "Pathaan",
        rating: 7.8,
        genre: "Action",
        year: 2023,
        director: "Siddharth Anand",
        cast: ["Shah Rukh Khan", "Deepika Padukone", "John Abraham"],
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIOHA0DTAKNAhDRUKyhxR2U6iokt9boztD3ur53XbnoOGkzBm9C-qckStDmlMnJZvYDFAM&s=10",
    }
];

function BollywoodMovieList() {
    //state for loading indicator
    const [Loading, setLoading]=useState(false);

    //state for genere filltering
    const [selectedGenre,setSelectedGenre]=useState("All");

    //state for movie data
    const [movies, setMovies]=useState(BollywoodMovie);

    //state for search term
    const [searchTerm, setSearchTerm]=useState("");

    //state for sorting by title
    const [sortBy,setSortBy]=useState("title");

    //const [selectedGenre,setSelectedGenre]=useState('All')

    const getRatingCategory=(rating=>{
        if(rating>=9.0){
            return "blockbuster";
        }if(rating>=8.5){
            return "superhit";
        }
        if(rating>=7.0){
            return "hit";
        }
        if(rating<7.0){
            return "average";
        }   
    })

    


   

    const sortedAdnFilterMovies=useMemo(()=>{
        //Filter movie first
        const filterdMovies=movies.filter(movie=>{
        const serchLower=searchTerm.toLowerCase();
        const titleMatch=movie.title.toLowerCase().includes(serchLower);
        const genreMatch=movie.genre.toLowerCase().includes(serchLower);
        const directorMatch=movie.director.toLowerCase().includes(serchLower);
        const castMatch=movie.cast.some(castMember=>castMember.toLowerCase().includes(serchLower));
        const yearMatch=movie.year.toString().includes(serchLower);
        
        const matchSearch= titleMatch || genreMatch || directorMatch || castMatch || yearMatch;

        const matchasGerre=selectedGenre==='All'  || movie.genre === selectedGenre;

        return matchSearch && matchasGerre;

        });


        //then sort the filtered results
        return filterdMovies.sort((a,b)=>{
        switch(sortBy){
            case 'rating':
                return b.rating-a.rating;
            case 'year':
                return b.year-a.year;
            case 'genre':
                return a.genre.localeCompare(b.genre);
            case 'title':
            default:    
                return a.title.localeCompare(b.title);    

        }
    });

    },[movies,searchTerm,selectedGenre,sortBy])

    const genres = ["All", ...new Set(movies.map(movie=>movie.genre))];

    return (
        <div className="bollywood-movies">
            <h1>Bollywood Hits</h1>
            {
                Loading ? (
                    <div className="loading-spinner">
                        <p>Loading Bollywood Movies...</p>
                    </div>
                ):(
                    <div className="main-content">

                        <div className="search-section">
                            <input
                                type="text"
                                placeholder="Search bollywood movies..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"

                            />

                        { searchTerm && (
                            <p className="search-results">
                                Founded {sortedAdnFilterMovies.length} movie{sortedAdnFilterMovies.length !== 1 ? 's' : ''} for "{searchTerm}"
                            </p>
                        )}

                        </div>
                        <div className="filter-section">
                            <h4>Filter by Genre:</h4>
                            <div className="genre-buttons">
                                {genres.map((genre)=>(
                                    <button key={genre} className={`genre-button ${selectedGenre === genre ? 'active' : ''}`}
                                     onClick={()=>setSelectedGenre(genre)}>
                                        {genre}
                                    </button>
                                ))}
                            </div>
                        </div>    
                        
                        {
                            <div className='sort-section'> 
                            <label htmlFor='sort-section'>Sort by:</label>
                                <select id='sort-section'
                                    value ={sortBy}
                                    onChange={(e)=>setSortBy(e.target.value)}>
                                        <option value="title">Title (A-Z)</option>
                                        <option value="rating">Rating (High-Low)</option>
                                        <option value="year">Year (Newest First)</option>
                                        <option value="genre">Genre (A-Z)</option>
                                </select>
                            </div>
                        }


                        {
                            (searchTerm || selectedGenre !=='All') && (
                                <button className='clear-filter' onClick={()=> {
                                    setSearchTerm('');
                                    setSelectedGenre('All');
                                }} >Clear All Filter</button>

                            )


                        }

                        <div className="movies-grid">
                            {(sortedAdnFilterMovies.length>0)?
                                
                                (sortedAdnFilterMovies.map((movie)=>(
                                    <div key={movie.id} className={`movie-card ${getRatingCategory(movie.rating)}`}>
                                        <img src={movie.image} alt={`${movie.title} poster`} className="movie-image"/>
                                        <h3 className="movie-title">{movie.title}</h3>
                                        <p className="movie-year">Year: {movie.year}</p>
                                        <p className="movie-genre">Genre: {movie.genre}</p>
                                        <p className="movie-director">Director: {movie.director}</p>
                                        <p className="movie-cast">Cast: {movie.cast.join(", ")}</p>
                                        <p className={`movie-rating rating-${getRatingCategory(movie.rating)}`}>Rating: {movie.rating}/10</p>
                                    </div>
                                ))):
                                (
                                    <div className='empty-state'>
                                        <h3>No Bollywood movie found!</h3>
                                        <p>
                                            {searchTerm || selectedGenre !== 'All' ?
                                                "Try adjusting your searh or filter criteria" :
                                                "Start searching to find amazing Bollywood movies!"
                                            }

                                        </p>
                                    </div>    
                                )}
                            
                        </div>
                    </div>
                )
            }

           


        </div>
    );
}   

export default BollywoodMovieList;

