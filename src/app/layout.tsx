'use client';

import React from 'react';
import '../styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
} 