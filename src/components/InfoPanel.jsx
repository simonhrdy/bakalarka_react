export default function InfoPanel({headline, text, children, className }) {
  return (
    <div className={className}>
        <h1 className={"text-xl"}>{headline}</h1>
        {children}
    </div>
  );
}
