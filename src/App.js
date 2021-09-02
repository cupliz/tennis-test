import { useState } from 'react'
function App() {
  const [score, setScore] = useState([0, 0])
  const [active, setActive] = useState(null)
  const [win, setWin] = useState(null)
  const [deuce, setDeuce] = useState(0)
  const step = [0, 15, 30, 40]
  const isWin = (p, s) => {
    if (active === p && s[p] === 40) {
      setWin(p)
    }
    if (s[0] === 40 && s[1] === 40 & win === null) {
      setDeuce(1)
    }

  }
  const hit = (p) => {
    return (e) => {
      if (deuce !== 2) {
        const newScore = JSON.parse(JSON.stringify(score))
        const i = step.indexOf(score[p])
        if (i < step.length - 1) {
          newScore[p] = step[i + 1]
          setScore(newScore)
          setActive(p)
          isWin(p, newScore)
        }
        if (deuce && active === p) {
          setWin(p)
          setDeuce(0)
        }
        if (deuce && active !== p) {
          setDeuce(2)
        }
      }
    }
  }
  const reset = () => {
    setScore([0, 0])
    setActive(null)
    setWin(null)
    setDeuce(0)
  }
  return (
    <>
      <div className="grid grid-cols-2">
        <div className="text-center text-indigo-500">
          <h1 className="my-4 font-bold">Player 1
            {active === 0 ? <span className="ml-4 bg-indigo-500 h-5 w-5 px-1 rounded-full">*</span> : ''}
          </h1>
          <button className="bg-indigo-500 text-white px-8 py-2 rounded-lg" onClick={hit(0)}>Hit</button>
          <div className="mt-8 text-4xl font-bold">{score[0]}</div>
          <div className="mt-8 text-4xl font-bold text-green-500">{win === 0 ? 'WIN!' : ''}</div>
        </div>
        <div className="text-center text-pink-500">
          <h1 className="my-4 font-bold">Player 2
            {active === 1 ? <span className="ml-4 bg-pink-500 h-5 w-5 px-1 rounded-full">*</span> : ''}
          </h1>
          <button className="bg-pink-500 text-white px-8 py-2 rounded-lg" onClick={hit(1)}>Hit</button>
          <div className="mt-8 text-4xl font-bold ">{score[1]}</div>
          <div className="mt-8 text-4xl font-bold text-green-500">{win === 1 ? 'WIN!' : ''}</div>
        </div>
      </div>
      <div className="text-center">
        <div className="mt-8 text-4xl font-bold text-green-500">{deuce === 1 ? 'DEUCE!' : deuce === 2 ? 'TIED!' : ''}</div>
        <button className="mt-4 bg-gray-500 text-white px-8 py-2 rounded-lg" onClick={reset}>Reset</button>
      </div>
    </>
  );
}

export default App;
