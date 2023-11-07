'use client'

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'
import { upsertNote, NoteResponse } from '@/app/actions/notes'
import { Tables } from '@/types/aliases'
import toast, { Toaster } from 'react-hot-toast';
// @ts-ignore
import { useFormState } from 'react-dom'

interface NotePageProps {
    noteID?: number
}

const initialState: NoteResponse = {
  success: false,
  message: '',
  timestamp: Date.now().toString(),
  redirect: ''
}

export default function NoteEditor({ noteID }: NotePageProps) {
  const supabase = createClient()
  const [note, setNote] = useState<Tables<'notes'>>({} as Tables<'notes'>)
  const [state, formAction] = useFormState<NoteResponse, any>(upsertNote, initialState)

  useEffect(() => {
    if (state.redirect) {
      redirect(state.redirect)
    }

    if (state.success) {
      toast.success('Note saved successfully!')
    } else if (state.message) {
      toast.error(`Error saving note: ${state.message}`)
    }
  }, [state])

  useEffect(() => {
    if (!noteID) return
    const getData = async () => {
      supabase.from('notes').select().eq('id', noteID).limit(1).single().then(({ data, error }) => {
        if (error) {
          toast.error(`Error fetching note: ${error.message}`)
          return
        }
        if (data) {
          setNote(data ?? {})
        }
      });
    }
    getData()
  }, [noteID])

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newVal = e.currentTarget.value
    setNote({
      ...note,
      [e.currentTarget.name]: newVal
    })
  }

  return (
    <div className="p-5">
      <Toaster />
      <h1 className="text-xl font-bold mb-4">Edit Note ID={note?.id}</h1>
      <form action={formAction} className="space-y-3">
        <input type="hidden" name="id" value={note.id} />
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleInputChange}
          defaultValue={note?.title ?? ''}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
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
          Back
        </Link>
      </div>
    </div>
  );
}
