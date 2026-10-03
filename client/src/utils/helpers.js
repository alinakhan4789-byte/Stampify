export const progressPercent = (current, required) => Math.min(100, Math.round((current / required) * 100));
export const stampsLeft = (current, required) => Math.max(0, required - current);
export const formatDate = (d) => new Date(d).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
export const initials = (name = '') => name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
export const dashboardPath = (role) => (role === 'business' ? '/business' : '/customer');
