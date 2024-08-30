import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-xl">flipper</h1>
      <p className="text-muted-foreground">Flipper is a feature flagging service, with built in analytics and a simple UI and SDK. Flipper is Open Source, available on GitHub and can be self hosted in any environment.</p>
      <div className="mt-4 flex  gap-4">
        <Button asChild variant={'default'}>
          <Link href="/register" className="btn-primary">
            Get Started
          </Link>
        </Button>
        <Button asChild variant={'secondary'}>
          <Link href="https://github.com/hosenur/flipper" className="btn-primary">
            GitHub
          </Link>
        </Button>
      </div>
    </div>
  )
}
