// Desc: Context for user authentication
import { createContext } from "react";
import { UserSchema } from "@/schema";

interface AuthContextType {
  user: UserSchema | null;
  setUser: (user: UserSchema | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

export default AuthContext;