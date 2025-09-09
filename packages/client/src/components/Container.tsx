type ContainerProps = {
  children?: React.ReactNode;
};

export function Container({ children }: ContainerProps) {
  return (
    <div
      className="font-sans min-h-screen p-4 md:p-8 grid place-content-center
      place-items-start max-w-7xl mx-auto"
    >
      {children}
    </div>
  );
}
