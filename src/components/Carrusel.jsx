import Carousel from 'react-bootstrap/Carousel';
import "../App.css"


function IndividualIntervalsExample() {
  return (
    <div className="carousel">
      <Carousel>
        <Carousel.Item interval={1000}>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1731405858377-6de0070d8d65?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt='primer slide'
          />    
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item interval={500}>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1616410011236-7a42121dd981?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aXBob25lfGVufDB8fDB8fHww"
            alt='segundo slide'
            />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt='tercer slide'
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default IndividualIntervalsExample;