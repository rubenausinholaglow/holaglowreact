import React from 'react';
import { FilterUtilsProps } from '@utils/props';

export const applyFilter = (id: string, inputText : String, products: FilterUtilsProps['products']) => {

    const currentProducts = [...products];
    let filteredProducts = [];
  
    if (id === "0-250") {
      filteredProducts = currentProducts.filter(
        (product) => product.price >= 0 && product.price <= 250
      );
    } else if (id === "250-500") {
      filteredProducts = currentProducts.filter(
        (product) => product.price >= 250 && product.price <= 500
      );
    } else if (id === "500") {
      filteredProducts = currentProducts.filter((product) => product.price > 500);
    } else {
      filteredProducts = currentProducts;
    }
  
    // Filtrar por título o descripción si hay un texto de entrada
    console.log(inputText);
    if (inputText.length > 0) {
      const searchTerm = inputText.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm)
      );
    }
  
    return filteredProducts;
  };
  