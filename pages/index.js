import { useState } from "react"

function HeroComponent() {
    const [isDarkMode, setIsDarkMode] = useState(true)

    function OnHandleClick() {
        setIsDarkMode(!isDarkMode);
    }

    const mainElementStyles = {
        borderRadius: '4px',
        height: '400px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: isDarkMode ? '#56666B' : '#EEE1B3',
        color: isDarkMode ? 'white' : 'black',
        flexDirection: 'column',
        gap: '1rem',
        fontFamily: 'sans-serif'
    }

    const buttonElementStyle =
    {
        cursor: 'pointer'
    }

    return (
        <>
            <main style={mainElementStyles}>
                <span>Alexandre Rayol</span>
                <button onClick={OnHandleClick} style={buttonElementStyle}>Alterar tema </button>
            </main>
        </>
    )
}

export default function Home() {
    return HeroComponent()
}
