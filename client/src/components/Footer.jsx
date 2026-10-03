export default function Footer() {
  return (
    <footer className="border-t border-outline-variant/30 py-8 text-center text-sm text-on-surface-variant">
      © {new Date().getFullYear()} Stampify. Digital loyalty cards for local businesses.
    </footer>
  );
}
