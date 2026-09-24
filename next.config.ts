import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  //Configuracion momentanea para imagenes con el URL .unsplash.com
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;