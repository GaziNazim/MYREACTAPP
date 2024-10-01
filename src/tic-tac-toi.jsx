import React, { useState, useRef } from "react"

export default function Board() {

    const [history, setHistory] = useState([Array(9).fill(null)])
    const [nextMove, setNextMove] = useState(0);
    const squares = useRef(Array(9).fill(null));
    squares.current = (history[nextMove]);

    const winner = calculateWinner(squares.current);
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
        if(squares.current[index] || calculateWinner(squares.current)) 
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
                    <div className="board-row">
                        <Square value = {squares.current[0]} index = {0} handleClick = {() => handleClick(0)}/>
                        <Square value = {squares.current[1]} index = {1} handleClick = {() => handleClick(1)}/>
                        <Square value = {squares.current[2]} index = {2} handleClick = {() => handleClick(2)}/>
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
                    </div>
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



function Square({value, handleClick}) {
    return <button className="square" onClick={handleClick}>{value}</button>;
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
          return squares[a];
        }
      }
      return null;
}
