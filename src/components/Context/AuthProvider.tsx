import { Authenticator } from "@aws-amplify/ui-react";
import { ReactNode } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return (
    <Authenticator>
      {({ signOut, user }) => <>{children}</>}
    </Authenticator>
  );
};

export default AuthProvider;
