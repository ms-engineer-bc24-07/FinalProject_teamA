import Link from 'next/link'
import './styles.css'  // スタイルファイルをインポート

export default function Home() {
  return (
    <main className="camera-page">
      <h1>Welcome to WebCamera Coordinate</h1>
      <Link href="/camera">
        <button className="camera-button">
          撮影する
        </button>
      </Link>
    </main>
  )
}
