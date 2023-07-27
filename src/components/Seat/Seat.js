import { useEffect, useState } from "react"
import { SeatItem } from "./styled"

export default function Seat({ seat, handleSeat, isSelected }) {
    const [status, setStatus] = useState("available") // selected, available, unavailable
    const { id, isAvailable, name } = seat

    useEffect(() => {
        if (isSelected) {
            setStatus("selected")
        } else if (isAvailable) {
            setStatus("available")
        } else {
            setStatus("unavailable")
        }
    }, [isSelected])


    return (
        <SeatItem data-test="seat" onClick={handleSeat} status={status}>{name}</SeatItem>
    )
}