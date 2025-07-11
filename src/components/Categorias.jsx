import { Card, Container, Row, Col } from "react-bootstrap";
import '../App.css';

const categorias = [
  {
    nombre: "Celulares",
    imagen: "/image/aplicaciones-moviles.gif",
  },
  {
    nombre: "Accesorios",
    imagen: "/image/auriculares.gif",
  },
  {
    nombre: "Hogar",
    imagen: "/image/casa-inteligente.gif",
  },
  {
    nombre: "Videojuegos",
    imagen: "/image/videojuego.gif",
  },
];

function Categorias() {
  return (
    <section className="py-5 text-center bg-light">
      <Container>
        <h2 className="mb-4 categorias-titulo">Explora por categoría</h2>
        <Row className="g-4 justify-content-center">
          {categorias.map((cat, index) => (
            <Col key={index} xs={12} sm={6} md={3}>
              <Card className="h-100 shadow categoria-card">
                <Card.Img
                  variant="top"
                  src={cat.imagen}
                  alt={cat.nombre}
                  className="categoria-img"
                />
                <Card.Body>
                  <Card.Title className="text-capitalize">
                    {cat.nombre}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}

export default Categorias;