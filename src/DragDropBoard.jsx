import { useEffect, useRef } from "react";
import Sortable from "sortablejs";
import Masonry from "react-masonry-css";
import BoardItem from "./BoardItem";

const DragDropBoard = ({ 
  board = [], 
  setBoard, 
  deleteItem,
  updateItem
}) => {
    const boardRef = useRef(null);
  
    // console.log(board)

    const breakpointColumnsObj = {
      default: 4, 
      1100: 3,  
      700: 2,    
      500: 1     
    };

    useEffect(() => {
      if (boardRef.current) {
        const sortable = Sortable.create(boardRef.current, {
          animation: 150,
          onEnd: (evt) => {
            console.log("Drag event", evt)
            const newOrder = [...board];
            const [movedItem] = newOrder.splice(evt.oldIndex, 1);
            newOrder.splice(evt.newIndex, 0, movedItem);
            setBoard(newOrder);

            console.log("New order after drag", newOrder)
          },
        });
  
        return () => {
          sortable.destroy();
        };
      }
    }, [board, setBoard]);
  
    return (
      <div ref={boardRef} className="board">
        {/* {(board || []).map((item, index) => renderItem(item, index))} */}

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="board"
          columnClassName="board-column"
        >
          {board.map((item) => (
            <BoardItem key={item.id} item={item} onDelete={deleteItem} onUpdate={updateItem} />
          ))}
        </Masonry>
      </div>
    );
  };
  
  export default DragDropBoard;
  
