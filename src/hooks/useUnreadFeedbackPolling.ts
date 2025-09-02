import { useEffect, useState } from "react";
import { api } from "../api/client";
import type { Feedback } from "./useFeedbacks";

export default function useUnreadFeedbackPolling(interval = 5000) {
  const [count, setCount] = useState(0);

  const fetchUnread = async () => {
    try {
      const res = await api.get<Feedback[]>("/admin/feedbacks");
      const all = res.data;
      const unread = all.filter((f) => !f.adminNotified).length;
      setCount(unread);
    } catch (err) {
      console.error("Failed to fetch unread feedbacks", err);
    }
  };

  useEffect(() => {
    fetchUnread(); // initial fetch
    const timer = setInterval(fetchUnread, interval);
    return () => clearInterval(timer);
  }, [interval]);

  return count;
}
