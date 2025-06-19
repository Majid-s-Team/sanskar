import { Advertisement } from "./ads";

export type DashboardType = {
  ad_count: number;
  bussiness_count: number;
  user_count: number;
  recent_ads: Advertisement[];
};
