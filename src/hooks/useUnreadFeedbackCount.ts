import { useFeedbacks } from "./useFeedbacks";

export const useUnreadFeedbackCount = () => {
  const { data } = useFeedbacks();
  return data?.filter((f) => !f.adminNotified).length ?? 0;
};

export default useUnreadFeedbackCount;
