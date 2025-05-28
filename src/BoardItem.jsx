import { useState } from "react";
import ImageCarousel from "./ImageCarousel";

const BoardItem = ({ item, onDelete, onUpdate }) => {
  const [text, setText] = useState(item.text || "");
  const [images, setImages] = useState(item.images || []);
  const [caption, setCaption] = useState(item.caption || "");
  const [isEditingText, setIsEditingText] = useState(false);
  const [isEditingCaption, setIsEditingCaption] = useState(false);

  // Update item with new data
  const updateItem = (newValues) => onUpdate(item.id, newValues);

  // Save text changes
  const handleSaveText = () => {
    updateItem({ text });
    setIsEditingText(false);
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)

    Promise.all(
      files.map((file) => {
        return new Promise((resolve) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => resolve(reader.result)
        })
      })
    ).then((base64Images) => {
      const newImages = [...images, ...base64Images]
      setImages(newImages);
      updateItem({ images: newImages });
    })
  };

  // Save caption changes
  const handleSaveCaption = () => {
    updateItem({ caption });
    setIsEditingCaption(false);
  };

  return (
    <div className={`board-item ${item.type}`}>
        {/* Text Section */}
          {item.type === "text" && (
            <div>
              {isEditingText ? (
                <>
                  <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Write something..." />
                  <button onClick={handleSaveText}>Save</button>
                </>
              ) : (
                <>
                  <p onClick={() => setIsEditingText(true)}>{text || "Click to edit..."}</p>
                  {text && <button onClick={() => setIsEditingText(true)}>Edit</button>}
                </>
              )}
            </div>
          )}

          {/* Gallery Section */}
          {item.type === "gallery" && (
            <div>
              <input type="file" className="custom-file-upload" accept="image/*" multiple onChange={handleImageUpload} />
              
              {images.length === 1 ? (
                <img src={images[0]} alt="Uploaded" width="100%" /> 
              ) : (
                  <ImageCarousel 
                  images={images} 
                  setImages={setImages}
                  parentItemId={item.id}
                  updateItem={onUpdate}
                   />
              )}

              {/* Caption Section */}
              {isEditingCaption ? (
                <>
                  <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Add a caption..." />
                  <button onClick={handleSaveCaption}>Save</button>
                </>
              ) : (
                <>
                  <p onClick={() => setIsEditingCaption(true)}>{caption || "Click to add caption..."}</p>
                  {caption && <button onClick={() => setIsEditingCaption(true)}>Edit</button>}
                </>
              )}
            </div>
          )}

          <button className="delete-btn" onClick={() => onDelete(item.id)}>Delete</button>
        </div>
  );
};

export default BoardItem;
