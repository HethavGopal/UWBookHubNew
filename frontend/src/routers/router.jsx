import { createBrowserRouter} from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/home/Home.jsx";
import BookDetails from "../pages/books/BookDetails.jsx";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";
import CartPage from "../pages/books/CartPage.jsx";
import CheckutPage from "../pages/books/CheckutPage.jsx";
import SingleBook from "../pages/books/SingleBook.jsx";
import PrivateRouter from "./PrivateRouter.jsx";
import AdminRoute from "./AdminRoute.jsx";
import AdminLogin from "../components/AdminLogin.jsx";
import DashboardLayout from "../pages/dashboard/DashboardLayout.jsx";
import Dashboard from "../pages/dashboard/Dashboard.jsx";
import MangeBooks from "../pages/dashboard/manageBooks/MangeBooks.jsx";
import AddBook from "../pages/dashboard/addBook/AddBook.jsx";
import UpdateBook from "../pages/dashboard/editBook/UpdateBook.jsx";
import UserDashboardPage from "../pages/userDashboard/UserDashboardPage.jsx"
import AddNewItem from "../pages/user/AddNewItem.jsx";
import MarketplacePage from "../pages/marketplace/MarketplacePage.jsx";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/marketplace",
            element: <MarketplacePage/>
        },
        {
            path: "/orders",
            element: <div>Orders</div>
        },
        {
            path: "/about",
            element: <div>About</div>
        },
        {
          path: "/login",
          element: <Login/>
        },
        {
          path: "/register",
          element: <Register/>
        },
        {
          path: "/cart",
          element: <CartPage/>
        },
        {
          path: "/checkout",
          element: <PrivateRouter><CheckutPage/></PrivateRouter>
        },
        {
          path: "/listings/:id",
          element: <SingleBook/>
        },
        {
          path: "/listings/user-listings",
          element: <PrivateRouter><UserDashboardPage/></PrivateRouter>
        },
        {
          path: "/admin",
            element: <AdminLogin/>
        },
        {
          path: "/dashboard",
          element: <AdminRoute><DashboardLayout/></AdminRoute>,
          children: [
            {
              path: "",
              element:  <AdminRoute><Dashboard/></AdminRoute>,
            }, 
            {
              path: "add-new-book",
              element: <AdminRoute><AddBook/></AdminRoute>
            },
            {
              path: "edit-book/:id",
              element: <AdminRoute><UpdateBook/></AdminRoute>
            },
            {
              path: "manage-books",
              element: <AdminRoute><MangeBooks/></AdminRoute>
            }
          ]
        },
        {
          path: "add-new-item",
          element: <PrivateRouter><AddNewItem/></PrivateRouter>
        }
      ]
    },
], {
  future: {
    v7_skipActionErrorRevalidation: true,
  }
});

export default router;