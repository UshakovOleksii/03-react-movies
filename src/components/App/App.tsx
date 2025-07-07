import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { fetchMovies } from '../../services/movieService'
import type { Movie } from '../../types/movie'
import SearchBar from '../SearchBar/SearchBar'
import MovieGrid from '../MovieGrid/MovieGrid'
import Loader from '../Loader/Loader'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import MovieModal from '../MovieModal/MovieModal'

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  const handleSearch = async (formData: FormData) => {
    const query = formData.get('query')?.toString().trim() || ''

    if (!query) {
      toast.error('Please enter your search query.')
      return
    }

    setMovies([])
    setError(false)
    setLoading(true)

    try {
      const results = await fetchMovies(query)
      if (results.length === 0) {
        toast.error('No movies found for your request.')
      }
      setMovies(results)
    } catch {
      setError(true)
      toast.error('There was an error, please try again...')
    } finally {
      setLoading(false)
    }
  }

  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie)
  }

  const handleCloseModal = () => {
    setSelectedMovie(null)
  }

  return (
    <div>
      <SearchBar action={handleSearch} />

      {loading && <Loader />}
      {!loading && error && <ErrorMessage />}
      {!loading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelect} />
      )}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  )
}

export default App
