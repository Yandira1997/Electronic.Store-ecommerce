import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CarritoContext } from "../contexts/CarritoContext";
import SafeImage from "./SafeImage";

const CardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 350px;
  background-color: #fff;
  border-radius: 8px;
  margin: 10px auto;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 14px 40px rgba(0, 0, 0, 0.25);
  }

  &:hover .description {
    bottom: 0;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
`;

const TitleWrapper = styled.div`
  padding: 10px;
`;

const Title = styled.h3`
  color: black;
  font-size: 1rem;
  font-weight: 600;
  text-align: center;
`;

const Description = styled.div.attrs(() => ({
  className: "description",
}))`
  position: absolute;
  bottom: -160px;
  left: 0;
  width: 100%;
  background-color: rgb(162, 204, 222);
  padding: 15px;
  text-align: center;
  transition: bottom 0.3s ease-in-out;
  z-index: 2;
`;

const Price = styled.p`
  margin: 5px 0;
  font-size: 1rem;
  font-weight: bold;
  color: #000;
`;

const Span = styled.span`
  display: block;
  font-size: 0.9rem;
  color: #000;
`;

const DetailsButton = styled.button`
  border: 2px solid #444;
  background-color: #fff;
  color: #000;
  padding: 6px 12px;
  font-size: 14px;
  margin-top: 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #ddd;
  }
`;

function Card({ producto, paginaActual, filtro }) {
  const { agregarAlCarrito } = useContext(CarritoContext);

  return (
    <CardContainer>
      <ImageWrapper>
        <ProductImage as={SafeImage} src={producto.imagen} alt={producto.name} />
      </ImageWrapper>

      <TitleWrapper>
        <Title>{producto.name}</Title>
      </TitleWrapper>

      <Description>
        <Price>$ {producto.price}</Price>
        <Span>{producto.descripcion}</Span>
        <Link
          to={`/productos/${producto.id}?page=${paginaActual}&filtro=${encodeURIComponent(
            filtro
          )}`}
        >
          <DetailsButton>Ver detalles</DetailsButton>
        </Link>
      </Description>
    </CardContainer>
  );
}

export default Card;
