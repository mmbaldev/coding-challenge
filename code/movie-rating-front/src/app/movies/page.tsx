export default async function Movies() {
  const data = await fetch("http://localhost:5000/api/movies");
  const movies = await data.json();
  return (
    <div>
      <ul>
        {movies.map((movie: { id: string; title: string }) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
}
