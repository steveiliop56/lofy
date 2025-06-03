// From: https://github.com/runtipi/runtipi/blob/develop/packages/frontend/src/components/app-logo/app-logo.tsx

import clsx from "clsx";
import type React from "react";
import "./logo.css";

export const Logo: React.FC<{
  url?: string;
  size?: number;
  className?: string;
  alt?: string;
  placeholder?: boolean;
}> = ({ url, size = 128, className = "", alt = "" }) => {
  return (
    <div
      aria-label={alt}
      className={clsx("logo-shadow", className)}
      style={{ width: size, height: size, minWidth: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="200"
          height="200"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M-1 100C0 0 0 0 100 0S200 0 200 100 200 200 100 200 0 200 0 100"
            fill="white"
          />
        </mask>
        <image
          className="logo-image"
          href={url}
          mask="url(#mask0)"
          width="200"
          height="200"
        />
      </svg>
    </div>
  );
};
