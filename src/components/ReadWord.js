import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";

let timerId;

export const ReadWord = () => {
    console.log('ReadWord')
    let history = useHistory();
    const [speed, setSpeed] = useState(100);
    const [word, setWord] = useState("");
    const [isPause, setIsPause] = useState(false);
    const [index, setIndex] = useState(0);

    const onContinueClick = () => {
        const indexForContinueReading = +localStorage.getItem("currentIndex")
        console.log("indexForContinueReading",indexForContinueReading)
        setIsPause(false);
        readText(indexForContinueReading);
    }

    const onBackClick = () => {
        clearInterval(timerId);
       setIsPause(false);
       history.push("/");
    }

    const onRereadClick = () => {
        clearInterval(timerId);
        setIsPause(false);
        readText(0);
    }

    const onSpeedChange = (event) => {
        setSpeed(event.target.value);
    }

    const onPauseClick = () => {
        clearInterval(timerId);
        const indexOfCurrentWord = "" + index;
        localStorage.setItem("currentIndex", indexOfCurrentWord)
        setIsPause(true);// показать кнопку continue
    }

    const readText = (startIndex) => {
        const savedText = localStorage.getItem("textForFastreader");
        const arrOfText = savedText.split(" ");
        showWord(arrOfText, startIndex);
    }

    const showWord = (arrOfText, startIndex) => {
       let indexOfCurrentWord = startIndex;
        timerId = setInterval(()=>{
            setWord(arrOfText[indexOfCurrentWord]);
            setIndex(++indexOfCurrentWord);
            if(indexOfCurrentWord === (arrOfText.length)){
                clearInterval(timerId)
            }

        }, conversion(speed))
    }

    function conversion(wordInMinute) {
        return 60000 / wordInMinute;
    }


    useEffect(() => {
        console.log('readText')
        readText(0);
    },[])

    return (
        <div className="wrapper-reader">
            <div className="word-reader-row">
                <div className="word">{word}</div>
                <div className="slidecontainer">
                    <label htmlFor="slider">
                        Слов в минуту (<span id="showSpeed">{speed}</span>)
                    </label>
                    <input
                        onChange={onSpeedChange}
                        value={speed}
                        type="range"
                        id="slider"
                        min="100"
                        max="500"
                        step="10"
                    />
                </div>
                <div className="buttons">
                    {!isPause ? <button className="pause" onClick={onPauseClick}>Pause</button> : <button className="continue" onClick={onContinueClick}>Continue</button>
                    }
                    <button className="reread" onClick={onRereadClick}>Reread</button>
                    <button className="back" onClick={onBackClick}>Back</button>
                </div>
            </div>
        </div>
    );
}