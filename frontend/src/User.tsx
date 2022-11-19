import './User.css';

interface Props {
  id: number;
  name: string;
}

function User(props: Props) {
  const { id, name } = props;

  return (
    <div className='User'>
      <p>{name}</p>
      <small>{id}</small>
    </div>
  );
}

export default User;
