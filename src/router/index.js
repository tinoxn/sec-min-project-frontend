import { createRouter, createWebHistory } from "vue-router";
import OrderDetails from "../views/OrderDetails.vue";
import HomeView from "@/views/HomeView.vue";

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
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
