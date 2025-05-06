import axios from "axios";
const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

export default {
	// method to save product
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
	// method to save orders
	saveOrder(data) {
		return axios
			.post(
				`${API_BASE_URL}/api/orders`,
				{
					order_number: data.orderNumber,
					customer_name: data.customerName,
					customer_code: data.customerCode,
					status: "pending",
					order_date: data.orderDate,
					items: data.items,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then((response) => response.data)
			.catch((error) => {
				return Promise.reject(error);
			});
	},
	// method to fetch products
	getProduct() {
		return axios
			.get(`${API_BASE_URL}/api/products`)
			.then((response) => response.data)
			.catch((error) => {
				return Promise.reject(error);
			});
	},
	// method to fetch orders
	getOrders() {
		return axios
			.get(`${API_BASE_URL}/api/orders`)
			.then((response) => response.data)
			.catch((error) => {
				return Promise.reject(error);
			});
	},
	// method to update status
	updateStatus(data) {
		return axios
			.put(
				`${API_BASE_URL}/api/orders/${data.orderId}`,
				{
					status: data.status,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			.then((response) => response.data)
			.catch((error) => {
				return Promise.reject(error);
			});
	},
	// method to delete order
	deleteOrder(id) {
		return axios
			.delete(`${API_BASE_URL}/api/orders/${id}`)
			.then((response) => response.data)
			.catch((error) => {
				return Promise.reject(error);
			});
	},
};
