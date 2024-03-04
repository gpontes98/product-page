import React, { useEffect, useState } from "react";

// @ts-ignore
import { getProduct } from "@hbler/api";
import { IProduct } from "./interfaces/IProduct";
import { navigateToUrl } from "single-spa";

const ProductPage = (): React.JSX.Element => {
  const [id, setId] = useState<string | undefined>("");
  const [product, setProduct] = useState<IProduct>({} as IProduct);

  useEffect(() => {
    const pathName = window.location.pathname;
    const productId = pathName.split("/").pop();

    setId(productId);
  }, [id, setId]);

  useEffect(() => {
    const requestItem = async (): Promise<void> => {
      const item = await getProduct(id);

      setProduct(item);
    };

    if (id !== "") {
      requestItem().catch((e) => console.log(e));
    }
  }, [product, setProduct, id]);

  return (
    <>
      {product.id !== 0 ? (
        <>
          <nav>
            <button type="button" onClick={() => navigateToUrl("/")}>
              Go back
            </button>
          </nav>
          <main key={product.id}>
            <h2>{product.title}</h2>
            <picture>
              <img src={product.thumbnail} alt={product.description} />
            </picture>
            <div>
              <h4>$ {product.price}</h4>
            </div>
            <div className="flex">
              <p>category: {product.category}</p>
              <p>brand: {product.brand}</p>
              <p>in stock: {product.stock}</p>
            </div>
          </main>
        </>
      ) : (
        <h1>Prodcut Not Found</h1>
      )}
    </>
  );
};

export default ProductPage;
