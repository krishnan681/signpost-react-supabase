import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../services/supabaseClient";
import Swal from "sweetalert2";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate(); // ✅ hook for redirect

  useEffect(() => {
    const checkUserValidity = async () => {
      const stored = localStorage.getItem("userData");

      if (stored) {
        const parsed = JSON.parse(stored);

        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("mobile_number", parsed.mobile_number)
          .single();

        if (error || !data) {
          localStorage.removeItem("userData");
          setUserData(null);

          // ✅ Show warning and redirect after OK
          Swal.fire({
            icon: "warning",
            title: "Account Removed",
            text: "Your account was deleted or no longer exists in our system.",
            confirmButtonText: "Go to Login",
          }).then(() => {
            navigate("/login");
          });
        } else {
          setUserData(parsed);
        }
      }
    };

    checkUserValidity();
  }, [navigate]);

  const login = (user) => {
    localStorage.setItem("userData", JSON.stringify(user));
    setUserData(user);
  };

  const logout = () => {
    localStorage.removeItem("userData");
    setUserData(null);
  };

  return (
    <AuthContext.Provider value={{ userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
