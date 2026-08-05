
interface CardProps {
  title: string;
  value: string | number;
}

const  Cards=({ title, value }: CardProps)=> {
  return (
    <div className="card">
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

export default Cards