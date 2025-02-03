// Dummy dashboard component with content
export const Home = () => {
  return (
    <>
      sup
      <div className="flex gap-2">
        {[...new Array(4)].map((i) => (
          <div
            key={"first" + i}
            className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
          ></div>
        ))}
      </div>
      <div className="flex gap-2 flex-1">
        {[...new Array(2)].map((i) => (
          <div
            key={"second" + i}
            className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
          ></div>
        ))}
      </div>
    </>
  );
};
