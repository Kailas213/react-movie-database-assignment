import React, { useState, useMemo } from 'react';
import './MovieExplorer.css';

const MOVIES = [
  { id: 1, title: 'Interstellar', year: 2014, genre: 'Sci-Fi', rating: 8.6, tags: ['Adventure', 'Space', 'Stars', 'Survival'] },
  { id: 2, title: 'Star Wars: A New Hope', year: 1977, genre: 'Sci-Fi', rating: 8.6, tags: ['Space Opera', 'Rebels', 'Force', 'Galaxy'] },
  { id: 3, title: 'The Star', year: 2017, genre: 'Animation', rating: 6.1, tags: ['Family', 'Journey', 'Friends'] },
  { id: 4, title: 'The Dark Knight', year: 2008, genre: 'Action', rating: 9.0, tags: ['Crime', 'Chaos', 'Hero', 'Gotham'] },
  { id: 5, title: 'Inception', year: 2010, genre: 'Sci-Fi', rating: 8.8, tags: ['Dreams', 'Heist', 'Mind', 'Reality'] },
  { id: 6, title: 'The Shawshank Redemption', year: 1994, genre: 'Drama', rating: 9.3, tags: ['Prison', 'Hope', 'Freedom', 'Friendship'] },
  { id: 7, title: 'Pulp Fiction', year: 1994, genre: 'Crime', rating: 8.9, tags: ['Crime', 'Violence', 'Dialogue', 'Nonlinear'] },
  { id: 8, title: 'The Godfather', year: 1972, genre: 'Crime', rating: 9.2, tags: ['Mafia', 'Family', 'Power', 'Classic'] },
  { id: 9, title: 'Forrest Gump', year: 1994, genre: 'Drama', rating: 8.8, tags: ['Life', 'Love', 'History', 'Journey'] },
  { id: 10, title: 'The Matrix', year: 1999, genre: 'Sci-Fi', rating: 8.7, tags: ['Simulation', 'Reality', 'Action', 'Hacker'] },
];

function MovieCard({ movie, isFavorited, onToggleFavorite }) {
  return (
    <div className={`movie-card${isFavorited ? ' movie-card--favorited' : ''}`}>
      <div className="movie-card__info">
        <div className="movie-card__title-row">
          <span className="movie-card__title">{movie.title}</span>
          <span className="movie-card__meta">{movie.year} · {movie.genre}</span>
        </div>
        <div className="movie-card__details-row">
          <span className="movie-card__rating">
            <span className="rating-star">★</span> {movie.rating}
          </span>
          <span className="movie-card__tags">
            {movie.tags.join(' · ')}
          </span>
        </div>
      </div>
      <button
        className={`fav-btn${isFavorited ? ' fav-btn--active' : ''}`}
        onClick={onToggleFavorite}
        aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorited ? '♥ Favorited' : '♡ Favorite'}
      </button>
    </div>
  );
}

function MovieExplorer() {
  const [query, setQuery] = useState('');
  const [favorites, setFavorites] = useState(new Set());
  const [darkMode, setDarkMode] = useState(false);

  // B2: Filter movies based on search query (title, genre, tags)
  const filteredMovies = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return MOVIES.filter(
      (movie) =>
        movie.title.toLowerCase().includes(q) ||
        movie.genre.toLowerCase().includes(q) ||
        movie.tags.some((tag) => tag.toLowerCase().includes(q))
    );
  }, [query]);

  // B5: Derive favorites list from state
  const favoriteMovies = useMemo(
    () => MOVIES.filter((m) => favorites.has(m.id)),
    [favorites]
  );

  // B4: Toggle favorite status
  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // B1: Reset clears search and favorites
  const handleReset = () => {
    setQuery('');
    setFavorites(new Set());
  };

  // B3: Conditional rendering based on query state
  const renderMatchingMovies = () => {
    if (!query.trim()) {
      return (
        <p className="state-message">
          Start typing to search for movies...
        </p>
      );
    }
    if (filteredMovies.length === 0) {
      return (
        <p className="state-message state-message--empty">
          No movies found for &ldquo;{query}&rdquo;.
        </p>
      );
    }
    return filteredMovies.map((movie) => (
      <MovieCard
        key={movie.id}
        movie={movie}
        isFavorited={favorites.has(movie.id)}
        onToggleFavorite={() => toggleFavorite(movie.id)}
      />
    ));
  };

  const resultLabel = query.trim()
    ? filteredMovies.length > 0
      ? `${filteredMovies.length} result${filteredMovies.length !== 1 ? 's' : ''} for "${query}"`
      : `No results for "${query}"`
    : '';

  return (
    <div className={`app-wrapper${darkMode ? ' dark' : ''}`}>
      {/* Theme toggle */}
      <button className="theme-toggle" onClick={() => setDarkMode((d) => !d)}>
        <span className="theme-toggle__icon">{darkMode ? '🌙' : '☀️'}</span>
        Toggle theme
      </button>

      <div className="card">
        {/* Card header */}
        <div className="card__header">
          <div>
            <h1 className="card__title">Movie Explorer</h1>
            <p className="card__subtitle">
              Search, filter, and favorite movies. Designed for a single-page React component structure.
            </p>
          </div>
          <span className="card__status">Local data · React state ready</span>
        </div>

        {/* B1: Search bar with state */}
        <div className="search-row">
          <div className="search-bar">
            <span className="search-bar__icon">🔍</span>
            <input
              type="text"
              className="search-bar__input"
              placeholder='Search movies (e.g. "Interstellar", "Star")'
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search movies"
            />
            {query && (
              <button
                className="search-bar__clear"
                onClick={() => setQuery('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          <button className="reset-btn" onClick={handleReset}>
            ↺ Reset
          </button>
        </div>

        {/* Status row with B3 state pills */}
        <div className="status-row">
          <span className="status-row__count">{resultLabel}</span>
          <div className="status-row__pills">
            <span className="pill">No input → show hint</span>
            <span className="pill">No match → show empty state</span>
          </div>
        </div>

        {/* Content: two-column layout */}
        <div className="content-grid">
          {/* Left: Matching Movies */}
          <div className="column">
            <div className="column__header">
              <h2 className="column__title">Matching Movies</h2>
              <span className="column__label">Filtered from local movie data</span>
            </div>
            <div className="movies-list">{renderMatchingMovies()}</div>
          </div>

          {/* Right: Favorite Movies (B5) */}
          <div className="column">
            <div className="column__header">
              <h2 className="column__title">Favorite Movies</h2>
              <span className="column__label">Derived from favorite state</span>
            </div>
            <div className="favorites-section">
              {favoriteMovies.length > 0 ? (
                <div className="favorites-inline">
                  {favoriteMovies.map((m) => (
                    <span key={m.id} className="favorites-inline__item">
                      ♡ {m.title} ({m.year})
                    </span>
                  ))}
                </div>
              ) : (
                <p className="state-message">You haven&apos;t added any favorites yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieExplorer;
