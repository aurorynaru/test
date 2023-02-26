import { useState, useEffect, useRef } from 'react'
import Intro from './components/Intro'
import Quiz from './components/Quiz'
import { nanoid } from 'nanoid'
function App() {
    const [startGame, setStartGame] = useState(false)
    const [questionData, setQuestionData] = useState([])
    const [showScore, setShowScore] = useState(false)
    const [score, setScore] = useState('')
    const [loading, setLoading] = useState(false)
    const [newGame, setNewGame] = useState(false)
    const shouldRun = useRef(true)

    useEffect(() => {
        if (shouldRun.current) {
            shouldRun.current = false
            const getQuiz = async () => {
                const res = await fetch(
                    'https://opentdb.com/api.php?amount=5&category=15&difficulty=easy&type=multiple'
                )
                const data = await res.json()

                let newArr = []
                let quiz = {}

                if (data.results.length > 0) {
                    for (const elem of data.results) {
                        quiz = {
                            id: nanoid(),
                            questions: elem.question,
                            answers: [
                                {
                                    answer: elem.incorrect_answers[0],
                                    isSelected: false
                                },
                                {
                                    answer: elem.incorrect_answers[1],
                                    isSelected: false
                                },
                                {
                                    answer: elem.incorrect_answers[2],
                                    isSelected: false
                                },
                                {
                                    answer: elem.correct_answer,
                                    isSelected: false
                                }
                            ],
                            correct_answer: elem.correct_answer
                        }
                        console.log('new data')

                        newArr.push(quiz)
                    }
                    setNewGame(false)
                    setQuestionData(newArr)
                    setLoading(false)
                }
            }
            getQuiz()
        }
    }, [newGame])

    const changeGameState = () => {
        setStartGame(true)
    }

    const setAnswer = (event, id) => {
        event.preventDefault()
        const { outerText } = event.target

        setQuestionData((prev) => {
            let newArr = []
            for (const elem of prev) {
                if (id === elem.id) {
                    let newAnsArray = []
                    elem.answers.forEach((answerObj) => {
                        if (
                            answerObj.answer
                                .replace(/&quot;/g, '"')
                                .replace(/&#039;/g, "'")
                                .replace(/&amp;/g, '&')
                                .replace(/&rsquo;/g, "'") === outerText
                        ) {
                            newAnsArray.push({
                                ...answerObj,
                                isSelected: !answerObj.isSelected
                            })
                        } else if (
                            answerObj.answer
                                .replace(/&quot;/g, '"')
                                .replace(/&#039;/g, "'")
                                .replace(/&amp;/g, '&')
                                .replace(/&rsquo;/g, "'") != outerText &&
                            answerObj.isSelected
                        ) {
                            newAnsArray.push({
                                ...answerObj,
                                isSelected: !answerObj.isSelected
                            })
                        } else {
                            newAnsArray.push(answerObj)
                        }
                    })

                    newArr.push({
                        ...elem,

                        answers: newAnsArray
                    })
                } else {
                    newArr.push(elem)
                }
            }

            return newArr
        })
    }

    const getScore = () => {
        if (showScore) {
            setLoading(true)
            setScore(0)
            setShowScore(false)
            shouldRun.current = true
            setNewGame(true)
            console.log(shouldRun)
            console.log(questionData)
        } else {
            let score = 0
            let answeredQuestions = 0
            questionData.forEach((elem) => {
                const userAnswer = elem.answers.find((answer) => {
                    return answer.isSelected
                })

                if (userAnswer === undefined) {
                    setScore(
                        <h3 className='score-text'>answer all the questions</h3>
                    )

                    return
                } else if (userAnswer.answer) {
                    answeredQuestions++
                    if (userAnswer.answer === elem.correct_answer) {
                        score++
                    }
                }
            })
            console.log(answeredQuestions)
            if (answeredQuestions == 5) {
                console.log(score + '/' + questionData.length)
                setScore(
                    <h3 className='score-text'>
                        {' '}
                        {'You scored ' +
                            score +
                            '/' +
                            questionData.length +
                            ' correct answers'}{' '}
                    </h3>
                )
                setShowScore(true)
            }
        }
    }

    const quizArray = questionData.map((elem) => {
        return (
            <Quiz
                key={elem.id}
                answers={elem.answers}
                correctAnswer={elem.correct_answer}
                id={elem.id}
                question={elem.questions}
                handleClick={setAnswer}
                showScore={showScore}
                newGame={newGame}
            />
        )
    })

    const loadingText = 'Loading'

    return (
        <div className='App'>
            {startGame ? (
                <main>
                    <div className='quiz-container'>
                        {loading ? loadingText : quizArray}
                    </div>
                    <div className='score-container'>
                        {showScore ? score : score ? score : ''}

                        <button className='quiz-btn' onClick={getScore}>
                            {showScore ? 'New game' : 'Check answers'}
                        </button>
                    </div>
                </main>
            ) : (
                <Intro handleClick={changeGameState} />
            )}
        </div>
    )
}

export default App
