import { getStorageData } from "../helper";

export const useSidebarLinks = () => {
  const role = getStorageData("role");

  const sidebarLinks = [
    {
      key: "/home",
      label: "Home",
      icon: "/icons/home.png",
      iconactive: "/icons/home-active.png",
    },
    {
      key: "/my-attendance",
      label: "Attendance Management",
      icon: "/icons/attendance.png",
      iconactive: "/icons/attendance-active.png",
    },
    {
      key: "/student-management",
      label: "Student Management",
      icon: "/icons/prayer.png",
      iconactive: "/icons/prayer-active.png",
    },
    {
      key: "/student-attendance",
      label: "Student Attendance",
      icon: "/icons/prayer.png",
      iconactive: "/icons/prayer-active.png",
    },
    {
      key: "/attendance-management",
      label: "Attendance Management",
      icon: "/icons/attendance.png",
      iconactive: "/icons/attendance-active.png",
    },
    {
      key: "/gurukul-prayer",
      label: "Gurukul Prayer",
      icon: "/icons/prayer.png",
      iconactive: "/icons/prayer-active.png",
    },
    {
      key: "/request-management",
      label: "Request Management",
      icon: "/icons/events.png",
      iconactive: "/icons/events-active.png",
    },
    {
      key: "/events-rsvp",
      label: "Events & RSVPs",
      icon: "/icons/events.png",
      iconactive: "/icons/events-active.png",
    },
    {
      key: "/forms",
      label: "Forms",
      icon: "/icons/forms.png",
      iconactive: "/icons/forms-active.png",
    },
    {
      key: "/about",
      label: "About",
      icon: "/icons/forms.png",
      iconactive: "/icons/forms-active.png",
    },
    {
      key: "/settings",
      label: "Settings",
      icon: "/icons/settings.png",
      iconactive: "/icons/settings-active.png",
    },
    {
      key: "/login",
      label: "Logout",
      icon: "/icons/logout.png",
    },
  ];

  const routes = {
    parent: [
      "/home",
      "/attendance-management",
      "/gurukul-prayer",
      "/events-rsvp",
      "/forms",
      "/about",
      "/settings",
      "/login",
    ],
    teacher: [
      "/home",
      "/my-attendance",
      "/student-management",
      "/student-attendance",
      "/gurukul-prayer",
      "/request-management",
      "/events-rsvp",
      "/forms",
      "/about",
      "/settings",
      "/login",
    ],
  };

  const allowedRoutes = routes[role as keyof typeof routes] || "parent";

  return sidebarLinks.filter(
    (link) => link.key === "/logout" || allowedRoutes.includes(link.key)
  );
};
