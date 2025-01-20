import { useRoutes } from 'react-router-dom'
import Layout from '../pages/layout/Layout'
import Home from '../pages/home/Home'
import Detail from '../pages/detail/Detail'
import Cart from '../pages/cart/Cart'
import CheckoutPage from '../pages/CheckOut/CheckOut'

const Router = () => {
  return (
    <>
        {
            useRoutes([
                {
                    path: "/",
                    element: <Layout/>,
                    children: [
                        {
                            path: "/",
                            element: <Home/>
                        },
                        {
                            path: "detail/:id",
                            element: <Detail/>
                        },
                        {
                            path: "cart",
                            element: <Cart/>
                        },
                        {
                            path: "checkout",
                            element: <CheckoutPage/>
                        }
                    ]
                }
            ])
        }
    </>
  )
}

export default Router