export const Bookmark = ({  id }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 cursor-pointer"
      fill="yellow"
      viewBox="0 0 24 24"
      stroke="currentColor"
      id={id}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
      />
    </svg>
  );
};

export const Minus = ({  id }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-8 cursor-pointer"
      fill="yellow"
      viewBox="0 0 24 24"
      stroke="currentColor"
      id={id}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};
