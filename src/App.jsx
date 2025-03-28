import { useState, useEffect } from "react";
import { saveBoard, loadBoard } from "./storage";
// import Masonry from "react-masonry-css";
import DragDropBoard from "./DragDropBoard";
// import BoardItem from "./BoardItem";
import "./App.css";

function App() {
  const [board, setBoard] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  console.log(board);

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

  const addItem = (newItem) => {
    const newItemWithId = {...newItem, id: Date.now() }
    console.log("Adding new item:", newItemWithId); 
    setBoard((prevBoard) => {
      const updatedBoard = [...prevBoard, newItemWithId];
      console.log("Updated board:", updatedBoard); 
      return updatedBoard;
    });
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
      <button
        onClick={() => {
          console.log("Add Gallery clicked"); 
          addItem({ type: "gallery", content: "New Gallery" });
        }}
      >
       Add Gallery
      </button>

        <button onClick={() => addItem("text")}>Add Text</button>
      </div>

      <DragDropBoard board={board} setBoard={setBoard} deleteItem={deleteItem} updateItem={updateItem} />

        {/* <Masonry
          breakpointCols={breakpointColumnsObj}
          className="board"
          columnClassName="board-column"
        >
          {board.map((item) => (
            <BoardItem key={item.id} item={item} onDelete={deleteItem} onUpdate={updateItem} />
          ))}
        </Masonry> */}
      {/* </DragDropBoard> */}

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