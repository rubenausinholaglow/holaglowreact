import React, { useState } from "react";
import { Product } from "@interface/product";
import { ProductTableProps } from "@utils/props";
import Link from "next/link";

export const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 13;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <table className="w-full border-collapse border">
        <colgroup>
          <col style={{ width: "100px" }} />
          <col style={{ width: "400px" }} />
          <col style={{ width: "100px" }} />
          <col style={{ width: "100px" }} />
          <col style={{ width: "100px" }} />
        </colgroup>
        <thead>
          <tr>
            <th className="px-4 py-2 text-center text-black">Nombre</th>
            <th className="px-4 py-2 text-center text-black">Descripción</th>
            <th className="px-4 py-2 text-center text-black">Precio</th>
            <th className="px-4 py-2 text-center text-black">Añadir</th>
            <th className="px-4 py-2 text-center text-black">Detalle</th>
          </tr>
        </thead>
        <tbody style={{ height: "500px", overflowY: "auto" }}>
          {currentProducts.map((product: Product, index: number) => (
            <tr
              key={product.id}
              className={index % 2 === 0 ? "bg-hg-700" : "bg-hg-600"}
            >
              <td
                className="px-4 py-2 text-white"
                style={{
                  whiteSpace: "pre-wrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  height: "90px",
                }}
              >
                {product.title}
              </td>
              <td
                className="px-4 py-2 text-white text-center"
                style={{
                  whiteSpace: "pre-wrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  height: "90px",
                }}
              >
                {product.description}
              </td>
              <td className="px-4 py-2 text-white text-center">
                {product.price} €
              </td>
              <td>
                <a style={{ cursor: "pointer" }}>
                  <div className="bg-indigo-300 hover:bg-indigo-400 text-white rounded-lg py-2 px-4 m-3 text-center">
                    Añadir
                  </div>
                </a>
              </td>
              <td>
                <Link
                  href={{
                    pathname: "/dashboard/budgets/treatments/detail",
                    query: {
                      search: product.id,
                    },
                  }}
                >
                  <div className="bg-purple-600 hover:bg-purple-800 text-white rounded-lg py-2 px-4 m-3 text-center">
                    Detalle
                  </div>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          disabled={currentPage === 1}
          onClick={goToPreviousPage}
        >
          Anterior
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={indexOfLastProduct >= products.length}
          onClick={goToNextPage}
        >
          Siguiente
        </button>
      </div>
    </>
  );
};
