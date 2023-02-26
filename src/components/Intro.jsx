const Intro = (props) => {
    return (
        <div className='intro'>
            <h1>Quizzical</h1>
            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
            <button onClick={props.handleClick} className='start-quiz-btn'>
                Start quiz
            </button>
        </div>
    )
}

export default Intro
