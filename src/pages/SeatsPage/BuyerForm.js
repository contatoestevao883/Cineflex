import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { BASE_URL } from "../../constants/urls"
import { FormContainer } from "./styled"

export default function BuyerForm({ selectedSeats, setSuccessInfo, session }) {
    const [form, setForm] = useState({ name: "", cpf: "" })
    const [disableButton, setDisableButton] = useState(true)

    const navigate = useNavigate()

    useEffect(() => {
        if (form.name && form.cpf && selectedSeats.length > 0) {
            setDisableButton(false)
        } else {
            setDisableButton(true)
        }
    }, [selectedSeats, form])

    function handleForm(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    function buyTicket(e) {
        e.preventDefault()

        const ids = selectedSeats.map((s) => s.id)
        const body = { ...form, ids }

        axios.post(`${BASE_URL}/seats/book-many`, body)
            .then(res => {
                const info = {
                    movie: session.movie.title,
                    date: session.day.date,
                    hour: session.name,
                    buyer: form.name,
                    cpf: form.cpf,
                    seats: selectedSeats.map((s) => s.name)
                }

                setSuccessInfo(info)
                navigate("/sucesso")
            })
            .catch(err => alert(err.response.data.message))

    }

    return (
        <FormContainer onSubmit={buyTicket}>

            <label htmlFor="name">Nome do Comprador:</label>
            <input
                id="name"
                placeholder="Digite seu nome..."
                name="name"
                value={form.name}
                onChange={handleForm}
                required
                data-test="client-name"
            />

            <label htmlFor="cpf">CPF do Comprador:</label>
            <input
                id="cpf"
                placeholder="Digite seu CPF..."
                name="cpf"
                value={form.cpf}
                onChange={handleForm}
                required
                data-test="client-cpf"
            />

            <button type="submit" disabled={disableButton} data-test="book-seat-btn">Reservar Assento(s)</button>
        </FormContainer>
    )
}