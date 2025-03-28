import { useEffect, useRef } from "react";
import Sortable from "sortablejs";

const DragDropBoard = ({ board = [], setBoard, renderItem }) => {
    const boardRef = useRef(null);
  
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
        {(board || []).map((item, index) => renderItem(item, index))}
      </div>
    );
  };
  
  export default DragDropBoard;
  
