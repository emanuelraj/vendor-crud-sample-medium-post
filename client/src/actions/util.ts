export const action = (type: string, payload = {}) => {
  return { type, ...payload };
};
