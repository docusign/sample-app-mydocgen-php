const TOKEN_KEY = 'token_key';
const TTL_IN_DAYS = 30;
const daysFromNow = (date) => (Date.now() - date) / (1000 * 3600 * 24);

const setAuthToken = (token) =>
  localStorage.setItem(TOKEN_KEY, JSON.stringify({ token, time: Date.now() }));

const getAuthToken = () => {
  try {
    const tokenData = JSON.parse(localStorage.getItem(TOKEN_KEY));
    return daysFromNow(tokenData.time) > TTL_IN_DAYS ? null : tokenData.token;
  } catch {
    return null;
  }
};

export { setAuthToken, getAuthToken };
