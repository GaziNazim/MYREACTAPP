import React, { useState, useRef } from "react"

export default function Board() {

    const [history, setHistory] = useState([Array(9).fill(null)])
    const [nextMove, setNextMove] = useState(0);
    const squares = useRef(Array(9).fill(null));
    squares.current = (history[nextMove]);

    const {winner, winnerRow} = calculateWinner(squares.current);
    let winnerStatus;

    const jumpTo = (index) => {
        setNextMove(index);
        setHistory(history.slice(0, index+1));
    }

    const moves = history.map((move, index) => {
        let text;
        if(index == 0) {
            text = "Start from begining"
        } else {
            text = "Go to step " + index;
        }
        return (
            <li key={index}>
              <button onClick={() => jumpTo(index)}>{text}</button>
            </li>
          );
    })

    if(winner) {
        winnerStatus = "Winner is " +  winner;
    } else {
        winnerStatus = "Next move is " + (nextMove%2==0? "X":"O");
    }

    const handleClick = (index) => {
        if(squares.current[index] || calculateWinner(squares.current).winner) 
            return;
        let newSquares = squares.current.slice();
        if(nextMove%2==0) {
            newSquares[index] = "X";
        } else {
            newSquares[index] = "O";
        }
        setNextMove(nextMove+1);
        setHistory([...history.slice(), newSquares]);
    }

    return(
        <>
            <div className="game">
                <div className="game-board">
                    <div className="status">{winnerStatus}</div>
                    {[0,3,6].map(item => {
                        return(
                        <div key={item} className="game-board">
                            <Square key={item + 0} value = {squares.current[item + 0]} index = {item + 0} handleClick = {() => handleClick(item + 0)} heighlit={winnerRow.includes(item + 0)} fail={winnerRow.length > 0}/>
                            <Square key={item + 1} value = {squares.current[item + 1]} index = {item + 1} handleClick = {() => handleClick(item + 1)} heighlit={winnerRow.includes(item + 1)} fail={winnerRow.length > 0}/>
                            <Square key={item + 2} value = {squares.current[item + 2]} index = {item + 2} handleClick = {() => handleClick(item + 2)} heighlit={winnerRow.includes(item + 2)} fail={winnerRow.length > 0}/>
                        </div>
                        )
                    })}
                    {/* <div className="board-row">
                        
                    </div>
                    <div className="board-row">
                        <Square value = {squares.current[3]} index = {3} handleClick = {() => handleClick(3)}/>
                        <Square value = {squares.current[4]} index = {4} handleClick = {() => handleClick(4)}/>
                        <Square value = {squares.current[5]} index = {5} handleClick = {() => handleClick(5)}/>
                    </div>
                    <div className="board-row">
                        <Square value = {squares.current[6]} index = {6} handleClick = {() => handleClick(6)}/>
                        <Square value = {squares.current[7]} index = {7} handleClick = {() => handleClick(7)}/>
                        <Square value = {squares.current[8]} index = {8} handleClick = {() => handleClick(8)}/>
                    </div> */}
                </div>
                <div className="game-info">
                    <ol>{moves}</ol>
                </div>
            </div>
        </>
    )
}

function Prr() {
    return (<p>This is paragraph.</p>);
}



function Square({value, handleClick, heighlit, fail}) {
    return <button className={`square ${heighlit? 'highlight': (value&&fail? 'hasValue': (fail? 'highlightFail' :''))}`} onClick={handleClick}>{value}</button>;
}

let calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return {winner: squares[a], winnerRow: lines[i]};
        }
      }
      return {square: null, winnerRow:[]};
}
