export const saveBoard = (board) => {
    localStorage.setItem("visionBoard", JSON.stringify(board))
}

export const loadBoard = () => {
    const savedBoard = localStorage.getItem("visionBoard");
    return savedBoard ? JSON.parse(savedBoard) : []
}