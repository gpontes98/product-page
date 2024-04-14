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
        <main className="p-4 flex flex-col gap-2">
          <nav>
            <button
              type="button"
              className="border-b-2 hover:cursor-pointer hover:text-primaryContrast"
              onClick={() => navigateToUrl("/")}
            >
              Go back
            </button>
          </nav>
          <section
            key={product.id}
            className="self-center flex flex-col p-10 shadow-inner rounded-md"
          >
            <div className="flex  justify-between items-baseline mb-6">
              <h2 className="text-xl text-title">{product.title}</h2>
              <h4 className="text-secondaryContrast">${product.price}</h4>
            </div>

            <picture className="shadow-lg">
              <img src={product.thumbnail} alt={product.description} />
            </picture>
            <div className="flex justify-between mt-4">
              <p>
                category:{" "}
                <span className="text-primaryContrast">{product.category}</span>
              </p>
              <p>
                brand:{" "}
                <span className="text-primaryContrast">{product.brand}</span>
              </p>
              <p>
                in stock:{" "}
                <span className="text-primaryContrast">{product.stock}</span>
              </p>
            </div>
          </section>
        </main>
      ) : (
        <h1>Prodcut Not Found</h1>
      )}
    </>
  );
};

export default ProductPage;
