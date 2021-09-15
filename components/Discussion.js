import Spacer from './Spacer';

export const Discussion = ({ title, children }) => {
  return (
    <>
      <Spacer axis="vertical" size={32} />
      <div style={{ width: 'fit-content' }}>
        <h4>{title}</h4>
        <hr />
      </div>

      <p>{children}</p>
    </>
  );
};
