import { SVGProps } from 'react';

export default function AlertIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M11.5 3a9.5 9.5 0 1 1 0 19a9.5 9.5 0 0 1 0-19Zm0 1a8.5 8.5 0 1 0 0 17a8.5 8.5 0 0 0 0-17ZM11 17v-2h1v2h-1Zm0-4V8h1v5h-1Z"
      ></path>
    </svg>
  );
}
