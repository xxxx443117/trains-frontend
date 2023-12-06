import { onBeforeUnmount } from "vue";

export const useRefreshTimer = (callback: () => void, sm = 10 * 1000) => {
  const timer = setInterval(() => {
    try {
      callback();
    } catch (error) {
      console.error(error);
    }
  }, sm);
  onBeforeUnmount(() => {
    if (timer) clearInterval(timer);
  });

  return timer;
};
