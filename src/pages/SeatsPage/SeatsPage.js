import { PageContainer, SeatsContainer } from "./styled"
import Footer from "../../components/Footer/Footer"
import Seat from "../../components/Seat/Seat"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { BASE_URL } from "../../constants/urls"
import Caption from "./Caption"
import BuyerForm from "./BuyerForm"

export default function SeatsPage({ setSuccessInfo }) {
    const [session, setSession] = useState(undefined)
    const [selectedSeats, setSelectedSeats] = useState([])
    const { idSessao } = useParams()

    useEffect(() => {
        axios.get(`${BASE_URL}/showtimes/${idSessao}/seats`)
            .then(res => setSession(res.data))
            .catch(err => console.log(err.response.data))
    }, [])

    if (session === undefined) {
        return <div>Carregando...</div>
    }

    function handleSeat(seat) {
        if (!seat.isAvailable) {
            alert("Esse assento não está disponível")
        } else {
            const isSelected = selectedSeats.some((s) => s.id === seat.id)

            if (isSelected) {   // Remove da lista de selecinoados
                const newList = selectedSeats.filter((s) => s.id !== seat.id)
                setSelectedSeats(newList)
            } else {            // Adiciona na lista de selecionados
                setSelectedSeats([...selectedSeats, seat])
            }
        }
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {session.seats.map((seat) => (
                    <Seat
                        key={seat.id}
                        seat={seat}
                        handleSeat={() => handleSeat(seat)}
                        isSelected={selectedSeats.some((s) => s.id === seat.id)}
                    />
                ))}
            </SeatsContainer>

            <Caption />

            <BuyerForm
                selectedSeats={selectedSeats}
                setSuccessInfo={setSuccessInfo}
                session={session}
            />

            <Footer
                posterURL={session.movie.posterURL}
                title={session.movie.title}
                weekday={session.day.weekday}
                hour={session.name}
            />
        </PageContainer>
    )
}
