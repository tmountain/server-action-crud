'use client'

import Link from 'next/link'
import { Tables } from '@/types/aliases'
import { useTransition } from 'react'
import { deleteNote } from '@/app/actions/notes'

export default function NoteList( { notes }: { notes: Tables<'notes'>[] }) {
    const [isPending, startTransition] = useTransition()

    return (
        <ul className="list-none p-0 max-w-md mx-auto">
            {notes.map(note => (
                <li key={note.id} className="bg-gray-100 p-4 my-2 rounded-md">
                    <Link className="text-gray-800 hover:text-blue-600" href={`/notes/${note.id}/edit`}>{note.title}</Link>
                    <button onClick={() => startTransition(() => deleteNote(note))} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    )
}