'use client'

import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { upsertNote } from '@/app/actions/notes'
import { Tables } from '@/types/aliases'

// add useFormState to this form
// https://github.com/vercel/next.js/blob/canary/examples/next-forms/app/add-form.tsx

interface NotePageProps {
    noteID?: number
}

export default function NoteEditor ( { noteID }: NotePageProps) {
    const supabase = createClient()
    const [note, setNote] = useState<Tables<'notes'>>({} as Tables<'notes'>)

  useEffect(() => {
    if (!noteID) return
    const getData = async () => {
      supabase.from('notes').select().eq('id', noteID).limit(1).single().then(({ data, error }) => {
        if (error) {
          console.log(`NoteEditor: error=${JSON.stringify(error)}`)
          return
        }
        if (data) {
          setNote(data ?? {})
          console.log(`NoteEditor: note=${JSON.stringify(data)}`)
        }
      });
    }
    getData()
  }, [noteID])

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">Edit Note ID={note?.id}</h1>
      <form action={upsertNote} className="space-y-3">
        <input type="hidden" name="id" value={note.id} />
        <input
          type="text"
          name="title"
          placeholder="Title"
          defaultValue={note?.title ?? ''}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {noteID ? 'Save Changes' : 'Create Note'}
        </button>
      </form>
      <div className="mt-3">
          <Link href="/notes" className="text-blue-500 hover:text-blue-700">
              Cancel
          </Link>
      </div>
    </div>
  );
}
