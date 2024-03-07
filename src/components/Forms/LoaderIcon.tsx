import loaderIcon from "../../assets/loader.svg";

export default function LoaderIcon() {
  return (
    <img
      src={loaderIcon}
      alt="loader icon"
      className=" h-16 w-16 absolute right-6"
    />
  );
}
