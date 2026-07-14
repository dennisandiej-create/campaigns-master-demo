type Props = {
  title: string;
  value: string;
};

export default function KPICard({
  title,
  value,
}: Props) {
  return (
    <div className="statCard">

      <h3>{value}</h3>

      <span>{title}</span>

    </div>
  );
}