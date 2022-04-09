export default function Layout({ children }) {
    return (
        <main style={{maxWidth: '360px', margin: 'auto', overflow: 'hidden'}}>
            {children}
        </main>
    )
  }