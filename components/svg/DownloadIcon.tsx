import React, { SVGProps } from 'react';

export default function DownloadIcon(props: SVGProps<SVGSVGElement>) {
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
        d="M12 4v12.25L17.25 11l.75.664l-6.5 6.5l-6.5-6.5l.75-.664L11 16.25V4h1ZM3 19h1v2h15v-2h1v3H3v-3Z"
      ></path>
    </svg>
  );
}
