export const PageHeading = ({ title, children }) => {
  return (
    <>
      <h1>{title}</h1>
      <div style={{ width: 'fit-content' }}>
        <small>{children}</small>
        <hr />
      </div>
      <br />
    </>
  );
};
