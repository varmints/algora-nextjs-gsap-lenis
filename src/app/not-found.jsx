import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Nie znaleziono</h2>
      <p>Nie można znaleźć żądanego zasobu</p>
      <Link href="/">Powrót do strony głównej</Link>
    </div>
  );
}
