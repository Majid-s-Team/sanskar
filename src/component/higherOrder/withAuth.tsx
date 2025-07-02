import React, { useState } from "react";
import { AuthRouteProps, RouteTypes } from "../../types";
import { Navigate } from "react-router-dom";
import { getStorageData } from "../../helper";

export const withAuthGuard = (
  WrappedComponent: React.FC,
  type: RouteTypes = RouteTypes.PUBLIC
) => {
  return (props: AuthRouteProps) => {
    const [user] = useState(getStorageData("user"));
    if (type === RouteTypes.AUTH) {
      if (!!user) return <Navigate to="/home" />;
      // @ts-ignore
      return <WrappedComponent {...props} />;
    }
    if (type === RouteTypes.PRIVATE) {
      if (!user) return <Navigate to="/login" />;
      // @ts-ignore
      return <WrappedComponent {...props} />;
    }
    // @ts-ignore
    return <WrappedComponent {...props} />;
  };
};
