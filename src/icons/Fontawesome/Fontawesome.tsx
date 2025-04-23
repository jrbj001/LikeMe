import React from "react";

interface Props {
  className?: string;
}

export const Fontawesome = ({ className }: Props): JSX.Element => {
  return (
    <svg
      className={`${className}`}
      fill="none"
      height="20"
      viewBox="0 0 20 20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.05624 13.8633C9.463 14.2702 10.1236 14.2702 10.5304 13.8633L16.7783 7.61328C17.185 7.20638 17.185 6.54557 16.7783 6.13867C16.3715 5.73177 15.7109 5.73177 15.3041 6.13867L9.79167 11.653L4.27919 6.14193C3.87242 5.73503 3.21184 5.73503 2.80507 6.14193C2.39831 6.54883 2.39831 7.20964 2.80507 7.61654L9.05298 13.8665L9.05624 13.8633Z"
        fill="white"
      />
    </svg>
  );
}; 