import { createContext, useContext, useEffect } from "react";
import { useRequest } from "../../hooks/useRequest";
// import { GurukalClassType, HouseType } from "../../types";
import { useAuth } from "../../hooks/useAuth";
import { getStorageData } from "../../helper";
import { user } from "../../repositories";
import { Student } from "../../types";

const DataContext = createContext<any>(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const { user: userData } = useAuth();

  const { data, execute, loading } = useRequest<Student[]>(
    user.url,
    user.method,
    {}
  );

  useEffect(() => {
    const token = getStorageData("access_token");
    if (userData && token) {
      execute({
        routeParams: `${userData?.user?.id}/students`,
      });
    }
  }, [userData]);

  const student = data?.filter((item: Student) => item.is_payment_done === 1);

  return (
    <DataContext.Provider value={{ student, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
