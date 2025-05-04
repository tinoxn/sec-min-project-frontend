import axios from "axios";
const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

export default {
	saveProduct(productInfo) {
		return axios
			.post(
				`${API_BASE_URL}/api/products`,
				{
					name: productInfo.name,
					price: productInfo.price,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then((response) => response.data)
			.catch((error) => {
				// throw error;
				return Promise.reject(error);
			});
	},
};
