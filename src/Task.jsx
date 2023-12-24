import React, { useState } from 'react';

function Task(props) {
    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("");
    const [number, setNumber] = useState([]);
    const [pattern, setPattern] = useState("")

    const handleChange1 = (e) => {
        let value = e.target.value;

        setValue1(value)
    }

    const handleChange2 = (e) => {
        let value = e.target.value;

        setValue2(value)
    }

    const handleSubmit1 = (e) => {
        e.preventDefault();

        let no1 = 0, no2 = 1,no3=0;
        let arr = [];

        if(value1 !== ""){
            if(value1 == 0){
                arr.push(no1)
            }else{
                arr.push(no1,no2)
                while (no3 <= value1) {
                    no3 = no1 + no2;
                    if (no3 <= value1) {
                        arr.push(no3)
                    }
                    
                    no1 = no2;
                    no2 = no3;
                }
            }
            setNumber(arr)
        }else{
            setNumber([])
        }

    }

    const handleSubmit2 = (e) => {
        e.preventDefault();

        let str = "";
        if(value2 !== ""){
            for(let i=1;i<=value2;i++){
                str+= " ".repeat(value2-i)
    
                for(let j=1;j<=2*i-1;j++){
                    if((2*i)/2 < j){
                        str+=String.fromCharCode(64 + (j - ((2*i)/2)))
                    }else{
                        str+=2*j-1
                    }
                }
                str+="\n"
            }
    
            for(let i=1;i<=value2;i++){
                str+=" ".repeat(i)
    
                for(let j=1;j<=2*(value2-i)-1;j++){
                    if((2*(value2-i))/2 < j){
                        str+=String.fromCharCode(64 + j- (value2-i))
                    }else{
                        str+=2*j-1
                    }
                }
    
                str+="\n"
            }
            setPattern(str)
        }else{
            setPattern(str)
        }

    }

    return (
        <div>
            <div>
                <h1>Task 1</h1>
                <label>Please enter your lucky number: </label>
                <input type='number' value={value1} onChange={(e) => handleChange1(e)} />
                <button onClick={(e) => handleSubmit1(e)}>Submit</button>
                <p className='mt-3'>{number.join(", ")}</p>
            </div>
            <div>
                <h1>Task 2</h1>
                <label>Please enter your lucky number: </label>
                <input type='number' value={value2} onChange={(e) => handleChange2(e)} />
                <button onClick={(e) => handleSubmit2(e)}>Submit</button>
                <pre>{pattern}</pre>
            </div>
        </div>
    );
}

export default Task;