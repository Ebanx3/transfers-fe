interface Props {
  alertMessage: string;
}

export default function ErrorAlert({ alertMessage }: Props) {
  return (
    <span className="bg-red-500 text-white font-medium p-2 absolute">
      {alertMessage}
    </span>
  );
}
