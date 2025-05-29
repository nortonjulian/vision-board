import { useEffect, useState } from "react";
// import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

const ImageCarousel = ({ images, setImages, parentItemId, updateItem }) => {
    const storageKey = `carouselIndex-${parentItemId}`
    const [currentIdx, setCurrentIdx] = useState(0);
    const [isRestored, setIsRestored] = useState(false)

    useEffect(() => {
        if (images && images.length > 0 && !isRestored) {
            const savedIndex = parseInt(localStorage.getItem(storageKey), 10);
            if (!isNaN(savedIndex) && savedIndex < images.length) {
                setCurrentIdx(savedIndex)
            }
            setIsRestored(true)
        }
    }, [images, storageKey, isRestored])

    useEffect(() => {
        if (isRestored) {
            localStorage.setItem(storageKey, currentIdx)
        }     
    }, [currentIdx, storageKey, isRestored])

    if (!images || images.length === 0 || !isRestored) return null

    const nextSlide = () => {
        setCurrentIdx((prev) => (prev + 1) % images.length);
    }

    const prevSlide = () => {
        setCurrentIdx((prev) => 
        prev === 0 ? images.length - 1 : prev - 1
     );
    }

    const handleDelete = (indexToRemove) => {
        const updatedImages = images.filter((_, index) => index !== indexToRemove);
        setImages(updatedImages)
        updateItem(parentItemId, { images: updatedImages })
        // localStorage.setItem("images", JSON.stringify(updatedImages))

    // if (currentIdx >= updatedImages.length) {
    //     setCurrentIdx(Math.max(0, updatedImages.length - 1))
    // }

    if (currentIdx >= updatedImages.length) {
        const newIdx = Math.max(0, updatedImages.length - 1)
        setCurrentIdx(newIdx)
        localStorage.setItem(storageKey, newIdx)
    }
}

    return (
        <div className="carousel-container">
            <div className="carousel-slider"
                style={{
                    transform: `translateX(-${currentIdx * 100}%)`,
                }}
                >
                {images.map((img, index) => (
                    <div className="carousel-slide" key={index}>
                        <img src={img} alt={`Slide ${index}`} />
                        <button className="carousel-delete" onClick={() => handleDelete(index)}>
                            X
                        </button>
                    </div>
                ))}
            </div>
            <button className="carousel-button prev" onClick={prevSlide}>‹</button>
            <button className="carousel-button next" onClick={nextSlide}>›</button>
        </div>
    )
}

export default ImageCarousel