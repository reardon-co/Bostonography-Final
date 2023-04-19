import { useEffect, useState } from "react"
import { GUESS_THRESHOLDS, MAX_ZOOM, MIN_ZOOM } from "../constants/mapConstants"
import { fetchLocationData, fetchLocationFromSuburb, haversineDistance, pickRandomCoordinates } from "../utils/fetchLocation"


const useGameLogic = ({ openModal }) => {
    const [position, setPosition] = useState(() => pickRandomCoordinates())
    const [positionData, setPositionData] = useState(null)
    const [zoomLevel, setZoomLevel] = useState(MAX_ZOOM)
    const [scoreIndicator, setScoreIndicator] = useState("")
    const [guess, setGuess] = useState("")
    const [gameWon, setGameWon] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const answer = await fetchLocationData(position[0], position[1]);
            setPositionData(answer)
        }
        fetchData()
    }, [position])

    const zoomOut = () => {
        setZoomLevel(zoomLevel - 1)
    }

    const onIncorrectGuess = async () => {
        const guessLocation = await fetchLocationFromSuburb(guess);
        if (guessLocation.length === 0) {
            setScoreIndicator(scoreIndicator + GUESS_THRESHOLDS[9999999]);
        } 
        else {
            const distance = haversineDistance(position[0], position[1], guessLocation[0].lat, guessLocation[0].lon);
            for (const [threshold, icon] of Object.entries(GUESS_THRESHOLDS)) {
                if (distance < threshold) {
                  setScoreIndicator(scoreIndicator + icon);
                  break;
                }
              }
        }
        if (zoomLevel === MIN_ZOOM) {
            openModal()
        }
        else {
            zoomOut()
        }
    }

    const onCorrectGuess = () => {
        setGameWon(true)
        setScoreIndicator(scoreIndicator + "✅")
        openModal()
    }

    const validateAnswer = async () => {
        const answer = await fetchLocationData(position[0], position[1]);
        if (guess.length === 0) {
            skipGuess()
        }
        else if (guess.toLowerCase() === answer.address.suburb.toLowerCase()) {
          onCorrectGuess()
        } else {
          onIncorrectGuess()
        }
      };

    const skipGuess = () => {
        setScoreIndicator(scoreIndicator + GUESS_THRESHOLDS[9999999])
        if (zoomLevel === MIN_ZOOM) {
            openModal()
        }
        else {
            zoomOut()
        }
    }
    

    return [{ position, positionData, zoomLevel, scoreIndicator, guess, gameWon }, { zoomOut, setScoreIndicator, setGuess, validateAnswer, skipGuess}]
}

export default useGameLogic