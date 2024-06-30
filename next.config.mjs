/** @type {import('next').NextConfig} */
export const experimental = {
    missingSuspenseWithCSRBailout: false,
};

export const images = {
    remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
          port: '',
          pathname: '**',
        },
      ],
}
