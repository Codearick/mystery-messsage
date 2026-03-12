import React from 'react';
import Link from 'next/link';
import { Separator } from './ui/separator';

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 dark:bg-dark dark:border dark:border-x-transparent dark:border-b-transparent">
        <Separator className='mb-10' />
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap md:flex-col lg:flex-row">
          <div className="w-full p-6 md:w-full lg:w-5/12">
            <div className="flex h-full flex-col justify-between text-center md:text-left">
              <div className="mb-4 inline-flex items-center justify-center md:justify-start">
                RG
              </div>
              <div>
                <p className="text-sm font-normal dark:text-light text-dark">
                  &copy; Copyright {new Date().getFullYear()}. Made with ❤️ by Rohan.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12 text-center md:text-left">
            <div className="h-full">
              <h3 className="tracking-px mb-4 text-lg font-semibold uppercase text-light dark:text-blue-500">
                Quick Links
              </h3>
              <ul>
                <li className="mb-2">
                  <Link className="text-base font-medium dark:tex hover:underline" href="/">
                    Home
                  </Link>
                </li>
                <li className="mb-2">
                  <Link className="text-base font-medium dark:tex hover:underline" href="/about">
                    About
                  </Link>
                </li>
                <li className="mb-2">
                  <Link className="text-base font-medium dark:tex hover:underline" href="/projects">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link className="text-base font-medium dark:tex hover:underline" href="/skills">
                    Skills
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-1/2 lg:w-2/12 text-center md:text-left">
            <div className="h-full">
              <h3 className="tracking-px mb-4 text-lg font-semibold uppercase text-light dark:text-blue-500">
                Contacts
              </h3>
              <ul>
                <li className="mb-2">
                  <Link className="text-base font-medium dark:text-light text-dark hover:underline" href="/">
                    GitHub
                  </Link>
                </li>
                <li className="mb-2">
                  <Link className="text-base font-medium dark:text-light text-dark hover:underline" href="/">
                    Twitter
                  </Link>
                </li>
                <li className="mb-2">
                  <Link className="text-base font-medium dark:text-light text-dark hover:underline" href="/">
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link className="text-base font-medium dark:text-light text-dark hover:underline" href="mailto:rohan.gautam650@gmail.com">
                    Email
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full p-6 md:w-full lg:w-3/12 text-center md:text-left">
            <div className="h-full">
              <h3 className="tracking-px mb-4 text-lg font-semibold uppercase text-light dark:text-blue-500">
                Legals
              </h3>
              <ul>
                <li className="mb-2">
                  <Link className="text-base font-medium dark:text-light text-dark hover:underline" href="/">
                    Terms & Conditions
                  </Link>
                </li>
                <li className="mb-2">
                  <Link className="text-base font-medium dark:text-light text-dark hover:underline" href="/">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link className="text-base font-medium dark:text-light text-dark hover:underline" href="/">
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;