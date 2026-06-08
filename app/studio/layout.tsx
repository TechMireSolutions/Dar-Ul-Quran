export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      dir="ltr"
      style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', height: '100vh' }}
    >
      {children}
    </div>
  )
}
