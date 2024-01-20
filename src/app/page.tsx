import Image from 'next/image'
import GameHeader from './play/components/gameHeader'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <GameHeader />
    </main>
  )
}
