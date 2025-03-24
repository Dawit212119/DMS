"use client";
import { Provider } from "react-redux";
import { store } from "@/state/store";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      {children}
      {/* </PersistGate> */}
    </Provider>
  );
};

export default Providers;
