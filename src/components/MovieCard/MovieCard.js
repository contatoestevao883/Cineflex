import { MovieContainer } from "./styled"

export default function MovieCard({ movie }) {
    const { posterURL, title } = movie

    return (
        <MovieContainer data-test="movie">
            <img src={posterURL} alt={title} />
        </MovieContainer>
    )
}

