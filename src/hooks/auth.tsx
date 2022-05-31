import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { api } from '../services';

interface IUser {
  id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar?: string;
}

interface IRegister {
  email: string;
  name: string;
  driver_license: string;
  avatar?: string;
  password: string;
}

interface IUpdate {
  id: string;
  old_password: string;
  password: string;
  name: string;
  driver_license: string;
  avatar?: string;
}

interface IAuthState {
  token: string;
  user: IUser;
}

interface ISignInCredentials {
  email: string;
  password: string;
}

interface IAuthContextData {
  user: IUser;
  register: (user: IRegister) => Promise<void>;
  update: (user: IUpdate) => Promise<void>;
  signIn: (credential: ISignInCredentials) => Promise<void>;
  signOut: () => void;
  loading: boolean;
}

interface IAuthProvideProps {
  children: React.ReactNode;
}
const AuthContext = createContext({} as IAuthContextData);

const AuthProvider = ({ children }: IAuthProvideProps) => {
  const [data, setData] = useState({} as IAuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const register = async (user: IRegister) => {
    await api.post('/users', {
      name: user.name,
      email: user.email,
      driver_license: user.driver_license,
      password: user.password,
    });
  };

  const signIn = async ({ email, password }: ISignInCredentials) => {
    const res = await api.post('/sessions', {
      email,
      password,
    });

    const { token, user } = res.data as IAuthState;

    api.defaults.headers.common.authorization = `Bearer ${token}`;

    setData(res.data);
  };

  const signOut = () => {
    api.defaults.headers.common.authorization = '';
    setData({} as IAuthState);
  };

  const update = async (user: IUpdate) => {
    try {
      const res = await api.post('/users/sync', {
        updated: [
          {
            user_id: data.user.id,
            name: user.name,
            driver_license: user.driver_license,
            password: user.password,
            avatar: user.avatar,
            old_password: user.old_password,
            token: data.token,
          },
        ],
      });
      const { avatar, driver_license, email, id, name } = res.data;
      setData({
        ...data,
        user: {
          avatar,
          driver_license,
          email,
          id,
          name,
        },
      });
    } catch (error) {}
  };

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, register, update, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
