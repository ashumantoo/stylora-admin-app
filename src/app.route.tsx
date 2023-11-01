import React, { useEffect } from "react";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AppLayout } from "./components/layout/Layout";
import { Products } from "./pages/products/Products";
import { Customers } from "./pages/customers/Customers";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Categories } from "./pages/category/Categories";
import { useSelector } from "react-redux";
import { Signin } from "./pages/auth/Signin";
import { Signup } from "./pages/auth/Signup";
import { Auth } from "./pages/auth";
import { ProductMutation } from "./pages/products/product-mutation";
import { Orders } from "./pages/orders/orders";
import { Invoices } from "./pages/orders/Invoices";
import { Payments } from "./pages/orders/payments";
import { CategoryPages } from "./pages/category-pages/category-pages";
import { CategoryPageMutation } from "./pages/category-pages/category-page-mutation";

const AppRoute: React.FC = () => {
  const { authenticated } = useSelector((state: any) => state.authReducer);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!authenticated) {
      navigate('/signin')
    }
    else {
      navigate(location.pathname === '/' ? '/dashboard' : location.pathname);
    }
  }, [authenticated])

  return (
    <>
      <Routes>
        <Route>
          <Route path="/" element={<Auth />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        {authenticated && (
          <>
            <Route element={<AppLayout />}>
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='products' element={<Products />} />
              <Route path='products/new' element={<ProductMutation />} />
              <Route path='products/:productId' element={<ProductMutation />} />
              <Route path='category' element={<Categories />} />
              <Route path='category-page' element={<CategoryPages />} />
              <Route path='category-page/new' element={<CategoryPageMutation />} />
              <Route path='category-page/:pageId' element={<CategoryPageMutation />} />
              <Route path='orders' element={<Orders />} />
              <Route path='invoices' element={<Invoices />} />
              <Route path='payments' element={<Payments />} />
              <Route path='customers' element={<Customers />} />
              <Route path='*' element={<Navigate to='/' replace />} />
            </Route>
          </>
        )}
      </Routes>
    </>

  )
};

export default AppRoute;