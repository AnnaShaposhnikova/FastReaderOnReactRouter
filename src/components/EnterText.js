import React from "react";
import { useHistory } from "react-router-dom";
import {useState} from "react";

export const EnterText = (props) => {
    let history = useHistory();
   const [inputTextValue, setInputTextValue] = useState("");

   const handleChangeText=(event)=>{
       setInputTextValue(event.target.value);
    }

    const onStartClick = () => {
        const text = inputTextValue.trim();
        if (!text) {
            return;
        }
        const arrOfText = text.split(" ");
        const arrOfTextWithoutSpaces = arrOfText.filter(element => {
            return element !== ""
        });
       const textWithoutSpaces = arrOfTextWithoutSpaces.join(" ");

        localStorage.setItem("textForFastreader", textWithoutSpaces);
        localStorage.removeItem("currentIndex");
        history.push("/read-word");
    };

    const onCancelClick = () => {
        setInputTextValue("");
        const savedText = localStorage.getItem("textForFastreader");

        if (Object.keys(savedText).length) {
            localStorage.removeItem("textForFastreader");
        }

    };

    return (
        <div className="wrapper">
            <div className="text-insert-row">
                <textarea
                    className="textarea"
                    name="textarea"
                    placeholder="Enter your text"
                    value={inputTextValue}
                    onChange={handleChangeText}
                    // defaultValue="Мультипликационный приключенческий сериал, расскажет о
                    //     веселой жизни Скруджа Макдака и его племянников. Главный
                    //     герой, селезень Скрудж гордится тем, чего он добился: он
                    //     настолько богат, что может купаться в куче золотых
                    //     монет, и при этом он настоящий скряга. Конечно, он
                    //     обожает деньги, но своих племянников Билли, Дилли и
                    //     Вилли он любит гораздо больше. Эти маленькие проказники
                    //     все время попадают в различные истории и поэтому
                    //     доставляют своему дядюшке немало хлопот..."
                >asd asd asd asd</textarea>
                <div className="buttons">
                    <button className="start" onClick={onStartClick}>
                        Start
                    </button>
                    <button className="cancel" onClick={onCancelClick}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};
