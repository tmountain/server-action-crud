import Link from 'next/link'
import { createSvcClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import NoteList from './NoteList'

export default async function Page() {
  const cookieStore = cookies()
  const supabase = createSvcClient(cookieStore)
  const { data } = await supabase.from('notes').select()
  const notes = data ?? []

  return (
    <div className="font-sans text-center">
      <NoteList notes={notes} />
      <Link href="/notes/new">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create New Note
        </button>
      </Link>
    </div>
  );
}