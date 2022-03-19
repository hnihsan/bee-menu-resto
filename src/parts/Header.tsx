/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Image from 'next/image';
type Props = {};

export default function Header({}: Props) {
  return (
    <header className="bg-bee-main body-font py-2 shadow-md sticky">
      <div className="container flex items-center justify-center">
        <img
          src="/images/bee-cafe-logo.svg"
          alt="Logo"
          className="rounded-full h-12 w-20"
        />
        <span className="text-xl text-white font-bold">
          Bee Creator Restaurant
        </span>
      </div>
    </header>
  );
}
