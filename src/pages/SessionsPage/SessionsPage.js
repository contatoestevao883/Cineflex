import SessionCard from "../../components/SessionCard/SessionCard"
import Footer from "../../components/Footer/Footer"
import { PageContainer } from "./styled"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { BASE_URL } from "../../constants/urls"

export default function SessionsPage() {
    const [movie, setMovie] = useState(undefined)
    const { idFilme } = useParams()

    useEffect(() => {
        axios.get(`${BASE_URL}/movies/${idFilme}/showtimes`)
            .then(res => setMovie(res.data))
            .catch(err => console.log(err.response.data))
    }, [])

    if (movie === undefined) {
        return <div>Carregando...</div>
    }

    return (
        <PageContainer>
            Selecione o horário
            <div>
                {movie.days.map((s) => (
                    <SessionCard key={s.id} session={s} />
                ))}
            </div>

            <Footer posterURL={movie.posterURL} title={movie.title} />
        </PageContainer>
    )
}