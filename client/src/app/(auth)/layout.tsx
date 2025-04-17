import { FC, ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="w-full flex min-h-screen justify-center items-center">
      {children}
    </div>
  );
};

export default AuthLayout;
