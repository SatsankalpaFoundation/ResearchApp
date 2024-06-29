import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center gap-3 h-[99vh]'>
      <Image
      src="/cow.svg"
      width={250}
      height={250}
      alt="Picture of cow"
    />
    <div className='flex flex-row items-center font-bold p-0'>
        <h1 className='text-6xl'>404</h1><div className='text-6xl'>‎ ‎|‎ ‎ </div><Button className='h-[60px] mt-1'><Link className='text-3xl' href="/">Return Home</Link></Button>
    </div>
    <h1 className='text-3xl font-bold'>Satsankalpa Research</h1>
    </div>
  )
}