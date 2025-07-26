import React from "react";
import { Provider } from "react-redux";
import { persistor, store } from "../redux/store/ConfigureStore";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import NavBar from "@/components/navbar/NavBar";
import UserDrawer from "@/components/userDrawer/UserDrawer";
const ReduxProvider = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  return (
    <>
      <Toaster />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {!isAdminRoute && (<>
             <UserDrawer  openProp={open} onClose={toggleDrawer(false)}/>
              <NavBar ClickHandeled={toggleDrawer(true)} /></>
          )}
          {children}
        </PersistGate>
      </Provider>
    </>
  );
};

export default ReduxProvider;
