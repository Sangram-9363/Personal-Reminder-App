export const getFromStorage = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error("Failed to parse localStorage item:", key);
    return null;
  }
};


export const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error("Failed to save to localStorage:", key);
  }
};

export const removeFromStorage = (key) => {
  localStorage.removeItem(key);
};

export const getCurrentUser = () => {
  return getFromStorage("currentUser");
};

export const getUserReminders = () => {
  const user = getCurrentUser();
  const reminders = getFromStorage("reminders") || [];
  if (!user) return [];
  return reminders.filter((r) => r.username === user.username);
};
