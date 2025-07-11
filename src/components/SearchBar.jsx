import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

const SearchContainer = styled.div`
  margin-bottom: 1.5rem;
  text-align: center;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 75%;
  margin: 0 auto;
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #888;
  pointer-events: none;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 2.5rem; 
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const SearchBar = ({ filtro, setFiltro }) => {
  const handleChange = (e) => setFiltro(e.target.value);

  return (
    <SearchContainer>
      <InputWrapper>
        <SearchIcon />
        <SearchInput
          type="text"
          placeholder="Buscar productos..."
          value={filtro}
          onChange={handleChange}
        />
      </InputWrapper>
    </SearchContainer>
  );
};

export default SearchBar;
