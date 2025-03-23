import { useState, useEffect } from "react";
import { saveBoard, loadBoard } from "./storage";
import BoardItem from "./BoardItem";
import "./App.css";

function App() {
  const [board, setBoard] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedBoard = loadBoard()
    setBoard(savedBoard)
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (isLoaded) {
      saveBoard(board)
    }
  }, [board, isLoaded])

  const addItem = (type) => {
    const newItem = { id: Date.now(), type, text: "", images: [], caption: "" }
    setBoard((prevBoard) => [...prevBoard, newItem]);
  };

  const deleteItem = (id) => {
    setBoard((prevBoard) => prevBoard.filter((item) => item.id !== id));
  }


  const updateItem = (id, newValue) => {
    setBoard((prevBoard) => prevBoard.map((item) => (item.id === id ? { ...item, ...newValue } : item)));
  };
 
  return (
    <div>
      <h1>Vision Board</h1>
      <div className="buttons">
        <button onClick={() => addItem("gallery")}>Add Gallery</button>
        <button onClick={() => addItem("text")}>Add Text</button>
      </div>

      <div className="board">
        {board.map((item) => (
          <BoardItem key={item.id} item={item} onDelete={deleteItem} onUpdate={updateItem} />
        ))}
      </div>
    </div>
  );
}

export default App;
