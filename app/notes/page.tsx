import Link from 'next/link'
import { createSvcClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = cookies()
  const supabase = createSvcClient(cookieStore)
  const { data } = await supabase.from('notes').select()
  const notes = data ?? []

  return (
    <div className="font-sans text-center">
      <ul className="list-none p-0 max-w-md mx-auto">
        {notes.map(note => (
          <li key={note.id} className="bg-gray-100 p-4 my-2 rounded-md">
            <Link className="text-gray-800 hover:text-blue-600" href={`/notes/${note.id}/edit`}>{note.title}</Link>
          </li>
        ))}
      </ul>
      <Link href="/notes/new">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create New Note
        </button>
      </Link>
    </div>
  );
}