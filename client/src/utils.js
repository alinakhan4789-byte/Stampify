// ES6 validation + helpers
export const rules = {
  name: (v) => /^[A-Za-z][A-Za-z\s'.-]{1,49}$/.test(v) || 'Enter a valid name (2-50 letters)',
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || 'Enter a valid email',
  password: (v) => /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(v) || 'Min 8 chars with a letter and a number',
};
export const validate = (form, fields) =>
  fields.map((f) => [f, rules[f](form[f])]).filter(([, r]) => r !== true).reduce((a, [f, r]) => ({ ...a, [f]: r }), {});
export const slots = (n) => Array.from({ length: n }, (_, i) => i);
