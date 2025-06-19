import { useContext } from "react";
import { UserContext } from "../store/user";

export const useUser = () => useContext(UserContext);
