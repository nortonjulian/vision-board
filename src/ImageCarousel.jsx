import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

const ImageCarousel = ({ images, setImages }) => {
    if (!images || images.length === 0) return null

    const handleDelete = (indexToRemove) => {
        const updatedImages = images.filter((_, index) => index !== indexToRemove);
        setImages(updatedImages)
        localStorage.setItem("images", JSON.stringify(updatedImages))
    }

    return (
        <Carousel showThumbs={false} showStatus={false} infiniteLoop={true} style={{ overflow: "visible" }}>
            {images.map((img, index) => (
                <div key={index} style={{ position: "relative" }}>
                    <img src={img} alt={`Slide ${index}`} className="carousel-image" />
                    <button className="carousel-delete" 
                    onClick={() => handleDelete(index)}
                    >
                        X
                    </button>
                </div>
            ))}
        </Carousel>
    )
}

export default ImageCarousel