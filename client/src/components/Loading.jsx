export default function Loading({ label = 'Loading...' }) {
  return <div className="py-16 text-center text-on-surface-variant" role="status"><div className="mx-auto mb-3 w-8 h-8 rounded-full border-4 border-primary-fixed border-t-primary animate-spin" />{label}</div>;
}
