import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false)

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme')
        if (storedTheme === 'dark') {
            setIsDarkMode(true)
            document.documentElement.classList.add('dark')
        } else {
            localStorage.setItem('theme', 'light')
            setIsDarkMode(false)
        }
    }, [])

    const toggleTheme = () => {
        if (isDarkMode) {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('theme', 'light')
            setIsDarkMode(false)
        } else {
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
            setIsDarkMode(true)
        }
    }

    return (
        <button onClick={toggleTheme} className="w-10 h-10 flex items-center justify-center rounded-full bg-footer-bg cursor-pointer">
            {isDarkMode ? <Sun className="text-yellow-300"/> : <Moon className="text-blue-900"/>}
        </button>
    )
}