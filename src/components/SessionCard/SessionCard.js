import { Link } from "react-router-dom"
import { ButtonsContainer, SessionContainer } from "./styled"

export default function SessionCard({ session }) {
    const { weekday, date, showtimes } = session

    return (
        <SessionContainer data-test="movie-day">
            {weekday} - {date}
            <ButtonsContainer>
                {showtimes.map(({ id, name: hour }) => (
                    <Link to={`/assentos/${id}`} key={id} data-test="showtime">
                        <button>{hour}</button>
                    </Link>
                ))}
            </ButtonsContainer>
        </SessionContainer>
    )
}