import client from "./client";

export const getOverview = () => client.get("/api/stats/overview");
export const getVolume = () => client.get("/api/stats/volume");
export const getCategories = () => client.get("/api/stats/categories");
export const getConfidence = () => client.get("/api/stats/confidence");