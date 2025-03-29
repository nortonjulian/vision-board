import { useState, useEffect } from "react";
import { saveBoard, loadBoard } from "./storage";
import DragDropBoard from "./DragDropBoard";
import "./App.css";

function App() {
  const [board, setBoard] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedBoard = loadBoard();
    setBoard(savedBoard);
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      saveBoard(board);
    }
  }, [board, isLoaded]);

  const addItem = (newItem) => {
    const newItemWithId = { ...newItem, id: Date.now() };
    setBoard((prevBoard) => [...prevBoard, newItemWithId]);
  };

  const deleteItem = (id) => {
    setBoard((prevBoard) => prevBoard.filter((item) => item.id !== id));
  };

  const updateItem = (id, newValue) => {
    setBoard((prevBoard) =>
      prevBoard.map((item) => (item.id === id ? { ...item, ...newValue } : item))
    );
  };

  return (
    <div>
      <h1>Vision Board</h1>
      <div className="buttons">
        <button onClick={() => addItem({ type: "gallery", content: "New Gallery" })}>
          Add Gallery
        </button>
        <button onClick={() => addItem({ type: "text", content: "New Text" })}>
          Add Text
        </button>
      </div>

      <DragDropBoard board={board} setBoard={setBoard} deleteItem={deleteItem} updateItem={updateItem} />
    </div>
  );
}

export default App;
