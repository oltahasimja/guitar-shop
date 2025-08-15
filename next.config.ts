/** @type {import('next').NextConfig} */
const nextConfig = {
images: {
  domains: [
    'upload.wikimedia.org',
    '1000logos.net',
    'example.com',
    'images.unsplash.com',
    'www.freepnglogos.com',
    'getlogo.net',
    'poldermeester.nl'
  ],
    remotePatterns: [
      { protocol: 'https', hostname: 'www.ibanez.com', pathname: '/**' },
      { protocol: 'https', hostname: 'www.martinguitar.com', pathname: '/**' },
      { protocol: 'https', hostname: 'theguitarworld.com', pathname: '/**' },
      { protocol: 'https', hostname: 'www.stars-music.com', pathname: '/**' },
      { protocol: 'https', hostname: 'stevesmusic.com', pathname: '/**' },
      { protocol: 'https', hostname: 'cdn.long-mcquade.com', pathname: '/**' },
        { protocol: 'https', hostname: 'www.fmicassets.com', pathname: '/**' },
        
    ],
}

};

module.exports = nextConfig;
