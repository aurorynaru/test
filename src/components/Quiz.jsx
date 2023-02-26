import React, { useRef } from 'react'
import { useState, useEffect } from 'react'

const Quiz = (props) => {
    const [isLoading, setIsLoading] = useState(true)
    const [result, setResult] = useState([])

    const shouldRun = useRef(true)
    useEffect(() => {
        if (shouldRun.current) {
            shouldRun.current = false
            if (result.length > 4) {
                setResult([])
            } else {
                let arr = [0, 1, 2, 3]

                let result = []

                for (let i = 1; i <= 4; i++) {
                    const random = Math.floor(Math.random() * (4 - i))
                    result.push(arr[random])
                    arr[random] = arr[4 - i]
                }

                if (result.length === 4) {
                    setResult(result)
                    setIsLoading(false)
                }
            }
        }
    }, [])

    if (props.newGame) {
        shouldRun.current = true
    }

    const resultsBG = (answerObj) => {
        if (answerObj.isSelected) {
            if (answerObj.answer === props.correctAnswer) {
                return {
                    backgroundColor: '#94D7A2'
                }
            } else {
                return {
                    backgroundColor: '#F8BCBC'
                }
            }
        } else if (
            !answerObj.isSelected &&
            answerObj.answer === props.correctAnswer
        ) {
            return {
                backgroundColor: '#94D7A2'
            }
        } else {
            return {
                backgroundColor: '#e5e7f1'
            }
        }
    }

    const styles = (isSelected) => {
        if (isSelected) {
            return {
                backgroundColor: '#bec7f3'
            }
        } else {
            return {
                backgroundColor: '#e5e7f1'
            }
        }
    }

    const onHover = (event) => {
        event.target.style.backgroundColor = '#bec7f3'
    }
    const onHoverLeave = (event) => {
        event.target.style.backgroundColor = '#e5e7f1'
    }

    return (
        <section>
            {isLoading ? (
                <h1>loading</h1>
            ) : (
                <>
                    {' '}
                    <p>
                        {props.question
                            .replace(/&quot;/g, '"')
                            .replace(/&#039;/g, "'")
                            .replace(/&amp;/g, '&')
                            .replace(/&rsquo;/g, "'")
                            .replace(/&eacute;/g, 'é')}
                    </p>
                    <div className='answers-container'>
                        <button
                            onMouseEnter={onHover}
                            onMouseLeave={onHoverLeave}
                            disabled={props.showScore}
                            onClick={(event) => {
                                return props.handleClick(event, props.id)
                            }}
                            style={
                                props.showScore
                                    ? resultsBG(props.answers[result[0]])
                                    : styles(
                                          props.answers[result[0]].isSelected
                                      )
                            }
                            className='answers'
                        >
                            {props.answers[result[0]].answer
                                .replace(/&quot;/g, '"')
                                .replace(/&#039;/g, "'")
                                .replace(/&amp;/g, '&')
                                .replace(/&rsquo;/g, "'")}
                        </button>
                        <button
                            onMouseEnter={onHover}
                            onMouseLeave={onHoverLeave}
                            disabled={props.showScore}
                            onClick={(event) => {
                                return props.handleClick(event, props.id)
                            }}
                            style={
                                props.showScore
                                    ? resultsBG(props.answers[result[1]])
                                    : styles(
                                          props.answers[result[1]].isSelected
                                      )
                            }
                            className='answers'
                        >
                            {props.answers[result[1]].answer
                                .replace(/&quot;/g, '"')
                                .replace(/&#039;/g, "'")
                                .replace(/&amp;/g, '&')
                                .replace(/&rsquo;/g, "'")}
                        </button>
                        <button
                            onMouseEnter={onHover}
                            onMouseLeave={onHoverLeave}
                            disabled={props.showScore}
                            onClick={(event) => {
                                return props.handleClick(event, props.id)
                            }}
                            style={
                                props.showScore
                                    ? resultsBG(props.answers[result[2]])
                                    : styles(
                                          props.answers[result[2]].isSelected
                                      )
                            }
                            className='answers'
                        >
                            {props.answers[result[2]].answer
                                .replace(/&quot;/g, '"')
                                .replace(/&#039;/g, "'")
                                .replace(/&amp;/g, '&')
                                .replace(/&rsquo;/g, "'")}
                        </button>
                        <button
                            onMouseEnter={onHover}
                            onMouseLeave={onHoverLeave}
                            disabled={props.showScore}
                            onClick={(event) => {
                                return props.handleClick(event, props.id)
                            }}
                            style={
                                props.showScore
                                    ? resultsBG(props.answers[result[3]])
                                    : styles(
                                          props.answers[result[3]].isSelected
                                      )
                            }
                            className='answers'
                        >
                            {props.answers[result[3]].answer
                                .replace(/&quot;/g, '"')
                                .replace(/&#039;/g, "'")
                                .replace(/&amp;/g, '&')
                                .replace(/&rsquo;/g, "'")}
                        </button>
                    </div>
                </>
            )}
        </section>
    )
}

export default Quiz
