import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/Layout';

export default function Custom404() {
  return (
    <Layout title="404 | Pokémon Explorer">
      <div className="flex flex-col items-center justify-center py-12">
        <div className="relative w-64 h-64 mb-8">
          <Image
            src="/404-pikachu.png"
            alt="Confused Pikachu"
            layout="fill"
            objectFit="contain"
          />
        </div>
        
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-xl text-gray-600 mb-8 text-center">
          Oops! Looks like the Pokémon you're looking for has escaped!
        </p>
        
        <Link href="/" className="btn btn-primary">
          Return to Homepage
        </Link>
      </div>
    </Layout>
  );
}