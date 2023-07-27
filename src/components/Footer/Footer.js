import { FooterContainer } from "./styled"

export default function Footer({ posterURL, title, weekday, hour }) {
    return (
        <FooterContainer data-test="footer">
            <div>
                <img src={posterURL} alt={title} />
            </div>
            <div>
                <p>{title}</p>
                {(weekday && hour) && <p>{weekday} - {hour}</p>}
                {/* {(weekday && hour) ? <p>{weekday} - {hour}</p> : null} */}
            </div>
        </FooterContainer>
    )
}