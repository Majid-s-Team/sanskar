// notificationRoutes.ts
export const notificationRoutes: Record<string, (id: number) => string> = {
  teacher_request_status: () => `/all-request`,
  absent_request_status: (id) => `/absent-requests/${id}`,
  event: () => `/events-rsvp`,
  announcement: () => `/announcements`,
  fee: (id) => `/fees/${id}`,
  homework: (id) => `/homework/${id}`,
};
