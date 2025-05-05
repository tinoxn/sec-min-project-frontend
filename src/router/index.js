import { createRouter, createWebHistory } from "vue-router";
import OrderDetails from "../views/OrderDetails.vue";
import HomeView from "@/views/HomeView.vue";
import CatalogView from "@/views/CatalogView.vue";
import OrderView from "@/views/OrderView.vue";

const routes = [
	{
		path: "/",
		name: "Home",
		component: HomeView,
	},
	{
		path: "/orders/:id",
		name: "OrderDetails",
		component: OrderDetails,
		props: true,
	},
	{
		path: "/order",
		name: "OrderManagement",
		component: OrderView,
	},
	{
		path: "/catalog",
		name: "ProductCategory",
		component: CatalogView,
		props: true,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
