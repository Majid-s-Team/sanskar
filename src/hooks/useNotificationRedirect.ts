import { useNavigate } from "react-router-dom";
import { notificationRoutes } from "../repositories";

export const useNotificationRedirect = () => {
  const navigate = useNavigate();

  return (item: any) => {
    const { type, reference_id } = item.notification;

    const routeFn = notificationRoutes[type];

    if (routeFn) {
      navigate(routeFn(reference_id));
    } else {
      navigate("/notifications"); // fallback
    }
  };
};
