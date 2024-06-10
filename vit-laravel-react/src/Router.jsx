import {
    createBrowserRouter,

  } from "react-router-dom";


  const router = createBrowserRouter ({

    {
        path: "/",
        element: <App/>,
        children: [
          {
            index:true,
            element:<LoanForm/>,
          },
          {
            path: "login",
            element:<LoanForm/>,
          },
          {
            path: "SignUp",
            element:<SignUp/>,
          },
          {
            path: "ResetPass",
            element:<ResetPass/>,
          },
        ],
      },

 });

  const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>);

reportWebVitals();


  export default router;
