import { Provider } from "react-redux";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Header from "./components/header";
import Home from "./components/home";
import TodoList from "./components/todolist";
import { AuthProvider } from "./contexts/authContext";
import { useRoutes } from "react-router-dom";
import store from "./store";

function App() {
  const routesArray = [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/todolist",
      element: <TodoList />,
    },
  ];

  const routesElement = useRoutes(routesArray); // Call useRoutes inside the App

  return (
    <Provider store={store}>
      <AuthProvider>
        <Header />
        <div className="w-full h-screen flex flex-col">
          {routesElement}
        </div>
      </AuthProvider>
    </Provider>
  );
}

export default App;
