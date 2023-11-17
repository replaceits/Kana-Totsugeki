import React from 'react'

import './ScoreCounter.scss'

export function ScoreCounter({ score }: { score: number }) {
  const displayRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!displayRef.current) return

    const cachedDisplayRef: HTMLDivElement = displayRef.current
    let counterHandler: number
    let lastTime: number | null = null

    const prevScore = parseInt(displayRef.current.innerText)

    if (prevScore === score) return

    const scoreDifference: number = prevScore - score

    cachedDisplayRef.classList.add(scoreDifference > 0 ? 'down' : 'up')

    const counter = (time: number) => {
      if (lastTime === null) lastTime = time

      const elapsedTime: number = time - lastTime
      const elapsedPercentage: number = Math.min(elapsedTime / 1000, 1)

      if (elapsedPercentage === 1) {
        cachedDisplayRef.classList.remove('down', 'up')
        cachedDisplayRef.innerText = `${score}`
      } else {
        cachedDisplayRef.innerText = `${Math.floor(
          prevScore + scoreDifference * -elapsedPercentage
        )}`

        counterHandler = requestAnimationFrame(counter)
      }
    }

    counterHandler = requestAnimationFrame(counter)

    return () => cancelAnimationFrame(counterHandler)
  }, [score])

  return (
    <div className="game-score mono" ref={displayRef}>
      0
    </div>
  )
}
