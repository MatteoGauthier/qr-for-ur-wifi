import { SVGProps } from 'react';

export default function PrinterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M17 3.998v5h1a3 3 0 0 1 3 3v5h-4v4H6v-4H2v-5a3 3 0 0 1 3-3h1v-5h11Zm1 9a1 1 0 1 1 0-2a1 1 0 1 1 0 2ZM3 12v4h3v-2h11v2h3v-4a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2Zm13 8v-5H7v5h9ZM7 5v4h9V5H7Z"
      ></path>
    </svg>
  );
}
