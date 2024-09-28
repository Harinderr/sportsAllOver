import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer id='footer' className="bg-bgBlack text-white py-8">
      <div className="container mx-auto flex flex-col items-center px-4 md:flex-row md:justify-between">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <Image
            src="/logo.png"
            alt="Image unavailable"
            height={40}
            width={40}
          />
          <p className="mt-4 max-w-md mx-auto md:mx-0">
            SportsAllOver is a platform where we post blogs covering all major sports, our analysis, and all the coming events of all major sports.
          </p>
        </div>
        <div className="flex flex-col  md:flex-row md:space-x-12">
          <div className="mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Navigation</h3>
            <nav className="flex flex-col items-center md:items-start space-y-2">
              <Link href="/" className="hover:underline">Home</Link>
              <Link href="#latest" className="hover:underline">Latest</Link>
              <Link href="/" className="hover:underline">Reviews</Link>
              <Link href="#popular" className="hover:underline">Most Popular</Link>
            </nav>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">Social</h3>
            <nav className="flex flex-col items-center md:items-start space-y-2">
              <Link href="/" className="flex items-center hover:underline">
                <Image src="/facebook.png" height={20} width={20} alt="Facebook" className="mr-2" />
                Facebook
              </Link>
              <Link href="/" className="flex items-center hover:underline">
                <Image src="/youtube.png" height={20} width={20} alt="Youtube" className="mr-2" />
                Youtube
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="bg-bgBlack text-gray-400 text-center py-4">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} SportsAllOver All rights reserved.
      </p>
    </div>
    </footer>
  );
};

export default Footer;
