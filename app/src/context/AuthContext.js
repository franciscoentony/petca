import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API } from "../../API";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [user, setUser] = useState(null);

  const login = async (email, senha) => {
    setIsLoading(true);
    try {
      console.log("Tentando logar com:", { email, senha });

      const response = await fetch(`${API}auth/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: senha,
        }),
      });

      const data = await response.json();

      console.log("Resposta completa do servidor:", data);

      if (response.ok && data.access) {
        await AsyncStorage.setItem("userToken", data.access);
        
        // Garante que só tenta salvar se o 'user' existir na resposta
        if (data.user) {
          await AsyncStorage.setItem("userData", JSON.stringify(data.user));
          setUser(data.user);
        } else {
          console.log("Aviso: O backend não enviou a chave 'user' no JSON.");
        }

        setUserToken(data.access);
      } else {
        alert("Erro ao logar: " + JSON.stringify(data));
      }
    } catch (erro) {
      console.log("Erro interno no JavaScript:", erro);
      // Exibe o erro real gerado no código para diagnóstico
      alert("Erro interno no App: " + erro.message);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (dadosUsuario) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API}auth/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dadosUsuario),
      });
      const data = await response.json();

      if (response.ok) {
        await login(dadosUsuario.email, dadosUsuario.senha);
        return { success: true };
      } else {
        return { success: false, errors: data };
      }
    } catch (erro) {
      console.log(erro);
      return { success: false, error: "Erro de conexão com o servidor" };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("userData");
      setUserToken(null);
      setUser(null);
    } catch (erro) {
      console.log(erro);
    } finally {
      setIsLoading(false);
    }
  };

  const verificarToken = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const storedUser = await AsyncStorage.getItem("userData");
      if (token) {
        setUserToken(token);
      }
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (erro) {
      console.log(erro);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verificarToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, register, logout, isLoading, userToken, user }}
    >
      {children}
    </AuthContext.Provider>
  );
};