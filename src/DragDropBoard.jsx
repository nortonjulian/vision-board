import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Masonry from "react-masonry-css";
import BoardItem from "./BoardItem";

const ItemType = "BOARD_ITEM";

const DraggableItem = ({ item, index, moveItem, deleteItem, updateItem }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id: item.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      className="board-item"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <BoardItem item={item} onDelete={deleteItem} onUpdate={updateItem} />
    </div>
  );
};

const DragDropBoard = ({ board, setBoard, deleteItem, updateItem }) => {
  const moveItem = (fromIndex, toIndex) => {
    const updatedBoard = [...board];
    const [movedItem] = updatedBoard.splice(fromIndex, 1);
    updatedBoard.splice(toIndex, 0, movedItem);
    setBoard(updatedBoard);
  };

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Masonry breakpointCols={breakpointColumnsObj} className="board" columnClassName="board-column">
        {board.map((item, index) => (
          <DraggableItem
            key={item.id}
            item={item}
            index={index}
            moveItem={moveItem}
            deleteItem={deleteItem}
            updateItem={updateItem}
          />
        ))}
      </Masonry>
    </DndProvider>
  );
};

export default DragDropBoard;
