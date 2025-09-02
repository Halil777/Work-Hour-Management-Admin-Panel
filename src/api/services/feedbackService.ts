import { api } from "../client";

export const markFeedbacksAsRead = async (): Promise<void> => {
  await api.post("/admin/feedbacks/mark-read");
};
