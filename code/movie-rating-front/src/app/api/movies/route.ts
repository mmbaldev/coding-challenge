import { NextResponse } from 'next/server';

// In-memory database for demonstration purposes
const movies = [
  { id: 1, title: 'Inception', director: 'Christopher Nolan', year: 2010 },
  { id: 2, title: 'The Dark Knight', director: 'Christopher Nolan', year: 2008 },
];

// Helper function to generate a new ID
const generateId = () => movies.length > 0 ? Math.max(...movies.map(movie => movie.id)) + 1 : 1;

// GET /api/movies - Fetch all movies
export async function GET() {
  return NextResponse.json(movies);
}

// POST /api/movies - Create a new movie
export async function POST(request: Request) {
  const { title, director, year } = await request.json();

  if (!title || !director || !year) {
    return NextResponse.json({ error: 'Title, director, and year are required' }, { status: 400 });
  }

  const newMovie = { id: generateId(), title, director, year };
  movies.push(newMovie);

  return NextResponse.json(newMovie, { status: 201 });
}

// PUT /api/movies/:id - Update a movie
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { title, director, year } = await request.json();

  const movieIndex = movies.findIndex(movie => movie.id === parseInt(id));

  if (movieIndex === -1) {
    return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
  }

  movies[movieIndex] = { ...movies[movieIndex], title, director, year };

  return NextResponse.json(movies[movieIndex]);
}

// DELETE /api/movies/:id - Delete a movie
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  const movieIndex = movies.findIndex(movie => movie.id === parseInt(id));

  if (movieIndex === -1) {
    return NextResponse.json({ error: 'Movie not found' }, { status: 404 });
  }

  const deletedMovie = movies.splice(movieIndex, 1)[0];

  return NextResponse.json(deletedMovie);
}