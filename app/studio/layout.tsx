type StudioLayoutProps = { children: React.ReactNode }

export default function StudioLayout({ children }: StudioLayoutProps) {
  return (
    <div
      style={{ fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', height: '100vh' }}
    >
      {children}
    </div>
  )
}
