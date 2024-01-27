import Carousel from "react-bootstrap/Carousel";

function CarouselUnctrl() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          src="https://images.unsplash.com/photo-1508599589920-14cfa1c1fe4d?q=80&w=2003&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="img-fluid"
          alt="Nike"
          style={{
            height: "20rem",
            width: "100vw",
            padding: "0px 5vw 0px 5vw",
          }}
        />
        <Carousel.Caption>
          <h3>Nike</h3>
          <p> American athletic footwear and apparel corporation</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          className="img-fluid"
          alt="Nike"
          style={{
            height: "20rem",
            width: "100vw",
            padding: "0px 5vw 0px 5vw",
          }}
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselUnctrl;
