import { useState, useEffect } from "react";
import { saveBoard, loadBoard } from "./storage";
import Masonry from "react-masonry-css";
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

  const breakpointColumnsObj = {
    default: 4, // 5 columns on large screens  // 4 columns at 1400px
    1100: 3,    // 3 columns at 1100px
    700: 2,     // 2 columns at 800px
    500: 1      // 1 column at 500px and below
  };
  
  return (
    <div>
      <h1>Vision Board</h1>
      <div className="buttons">
        <button onClick={() => addItem("gallery")}>Add Gallery</button>
        <button onClick={() => addItem("text")}>Add Text</button>
      </div>

      {/* <Masonry 
      breakpointCols={breakpointColumnsObj} 
      className="board" 
      columnClassName="board-column"><div className="board">
        {board.map((item) => (
          <BoardItem key={item.id} item={item} onDelete={deleteItem} onUpdate={updateItem} />
        ))}
      </div>
      </Masonry> */}

      <Masonry
      breakpointCols={breakpointColumnsObj}
      className="board"
      columnClassName="board-column">
      {board.map((item) => (
        <BoardItem key={item.id} item={item} onDelete={deleteItem} onUpdate={updateItem} />
      ))}
      </Masonry>


      {/* <div className="container">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="item">
            {i + 1}
          </div>
        ))}
      </div> */}

      {/* <div className="board">
        {board.map((item) => (
          <BoardItem key={item.id} item={item} onDelete={deleteItem} onUpdate={updateItem} />
        ))}
      </div> */}
    </div>
  );
}

export default App;