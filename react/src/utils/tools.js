export const restoreLastFocus = lastBlured => {
  const lastFocusedEl = document.getElementById(lastBlured);
  if (lastFocusedEl) {
    lastFocusedEl.focus();
  }
};
