// Import necessary functions from Vue Router
import { createRouter, createWebHistory } from "vue-router";

// Import view components for different routes
import HomeView from "@/views/HomeView.vue";
import CatalogView from "@/views/CatalogView.vue";
import OrderView from "@/views/OrderView.vue";

// Define the routes configuration
const routes = [
	// Home route: loads the HomeView component
	{
		path: "/",
		name: "Home", // Route name
		component: HomeView, // Component to be displayed for this route
	},
	// Order management route: loads the OrderView component
	{
		path: "/order",
		name: "OrderManagement", // Route name
		component: OrderView, // Component to be displayed for this route
	},
	// Product catalog route: loads the CatalogView component
	{
		path: "/catalog",
		name: "ProductCategory", // Route name
		component: CatalogView, // Component to be displayed for this route
		props: true, // Pass route parameters as props to the component
	},
];

// Create the Vue Router instance with history mode and the defined routes
const router = createRouter({
	history: createWebHistory(process.env.BASE_URL), // Use web history mode for clean URLs
	routes, // Register routes
});

// Export the router for use in the main Vue app
export default router;
