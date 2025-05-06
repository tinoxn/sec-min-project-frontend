// Import axios for making HTTP requests
import axios from "axios";

// Define the base URL for the API from the environment variable
const API_BASE_URL = process.env.VUE_APP_API_BASE_URL;

export default {
	// Method to save a product
	saveProduct(productInfo) {
		return axios
			.post(
				`${API_BASE_URL}/api/products`, // Endpoint for saving a product
				{
					// Product data to be sent in the request body
					name: productInfo.name,
					price: productInfo.price,
				},
				{
					headers: {
						"Content-Type": "application/json", // Setting content type to JSON
					},
				}
			)
			.then((response) => response.data) // Return the response data if successful
			.catch((error) => {
				return Promise.reject(error); // Reject the promise if there's an error
			});
	},

	// Method to save an order
	saveOrder(data) {
		return axios
			.post(
				`${API_BASE_URL}/api/orders`, // Endpoint for saving an order
				{
					// Order data to be sent in the request body
					order_number: data.orderNumber,
					customer_name: data.customerName,
					customer_code: data.customerCode,
					status: "pending", // Default status is set to "pending"
					order_date: data.orderDate,
					items: data.items,
				},
				{
					headers: {
						"Content-Type": "application/json", // Setting content type to JSON
					},
				}
			)
			.then((response) => response.data) // Return the response data if successful
			.catch((error) => {
				return Promise.reject(error); // Reject the promise if there's an error
			});
	},

	// Method to fetch all products
	getProduct() {
		return axios
			.get(`${API_BASE_URL}/api/products`) // GET request to fetch products
			.then((response) => response.data) // Return the response data if successful
			.catch((error) => {
				return Promise.reject(error); // Reject the promise if there's an error
			});
	},

	// Method to fetch all orders
	getOrders() {
		return axios
			.get(`${API_BASE_URL}/api/orders`) // GET request to fetch orders
			.then((response) => response.data) // Return the response data if successful
			.catch((error) => {
				return Promise.reject(error); // Reject the promise if there's an error
			});
	},

	// Method to update the status of an order
	updateStatus(data) {
		return axios
			.put(
				`${API_BASE_URL}/api/orders/${data.orderId}`, // Endpoint to update the status of a specific order
				{
					status: data.status, // New status for the order
				},
				{
					headers: {
						"Content-Type": "application/json", // Setting content type to JSON
					},
				}
			)
			.then((response) => response.data) // Return the response data if successful
			.catch((error) => {
				return Promise.reject(error); // Reject the promise if there's an error
			});
	},

	// Method to delete an order
	deleteOrder(id) {
		return axios
			.delete(`${API_BASE_URL}/api/orders/${id}`) // DELETE request to remove a specific order
			.then((response) => response.data) // Return the response data if successful
			.catch((error) => {
				return Promise.reject(error); // Reject the promise if there's an error
			});
	},
};
