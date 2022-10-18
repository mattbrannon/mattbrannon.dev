export const Source = ({ src, ...props }) => {
  const ext = src.slice(src.lastIndexOf('.') + 1);
  return <source src={src} type={`video/${ext}`} {...props} />;
};
