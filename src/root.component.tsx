import { QueryClientProvider } from "@tanstack/react-query";
// @ts-ignore
import { queryClient } from "@hbler/api";

import ProductPage from "./ProductPage";

const Root = (): React.JSX.Element => {
	return (
		<QueryClientProvider client={queryClient}>
			<ProductPage />
		</QueryClientProvider>
	);
};

export default Root