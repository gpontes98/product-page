import React, { useEffect, useState } from "react";
import { IProduct } from "./interfaces/IProduct";
import { navigateToUrl } from "single-spa";
import { useQuery } from "@tanstack/react-query";
// @ts-ignore
import { getProduct } from "@hbler/api";

const ProductPage = (): React.JSX.Element => {
	const [id, setId] = useState<string | undefined>("");

	useEffect(() => {
		const pathName = window.location.pathname;
		const productId = pathName.split("/").pop();
		setId(productId);
	}, []);

	const { data, error, isLoading } = useQuery<IProduct>({
		queryKey: ["productById", id],
		queryFn: () => getProduct(id),
		enabled: !!id, // O get só será executado se id existir
	});

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading product</div>;

	return (
		<>
			{data ? (
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
						key={data.id}
						className="self-center flex flex-col p-10 shadow-inner rounded-md"
					>
						<div className="flex justify-between items-baseline mb-6">
							<h2 className="text-xl text-title">{data.title}</h2>
							<h4 className="text-secondaryContrast">
								${data.price}
							</h4>
						</div>

						<picture className="shadow-lg">
							<img src={data.thumbnail} alt={data.description} />
						</picture>
						<div className="flex justify-between mt-4">
							<p>
								category:{" "}
								<span className="text-primaryContrast">
									{data.category}
								</span>
							</p>
							<p>
								brand:{" "}
								<span className="text-primaryContrast">
									{data.brand}
								</span>
							</p>
							<p>
								in stock:{" "}
								<span className="text-primaryContrast">
									{data.stock}
								</span>
							</p>
						</div>
					</section>
				</main>
			) : (
				<h1>Product Not Found</h1>
			)}
		</>
	);
};

export default ProductPage;
