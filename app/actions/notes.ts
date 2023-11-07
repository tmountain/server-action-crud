'use server'

import { createSvcClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache';
import { Tables } from '@/types/aliases'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

export interface NoteResponse {
    success: boolean
    message: string
    timestamp: string
    redirect: string
}

function timestamp(): string {
    return Date.now().toString()
}   

export async function deleteNote({ id }: Tables<'notes'>) {
    const cookieStore = cookies()
    const supabase = createSvcClient(cookieStore)

    await supabase.from('notes').delete().match({ id: id })
    console.log(`Deleted note ${id}`)
    revalidatePath(`/notes`)
}

export async function upsertNote(prevState: any, formData: FormData): Promise<NoteResponse> {
    let redirect = ''
    const cookieStore = cookies()
    const supabase = createSvcClient(cookieStore)

    const schema = z.object({
        id: zfd.numeric(z.number().int().positive().optional()),
        title: zfd.text(z.string().min(1)),
    })

    const parseResult = schema.safeParse(
        {
            id: formData.get('id'),
            title: formData.get('title'),
        }
    )

    if (!parseResult.success) {
        return { success: false, message: parseResult.error.message, timestamp: timestamp(), redirect: redirect }
    }
    const formValues = parseResult.data
    const isInsert = !formValues.id

    const { data, error } = await supabase.from('notes').upsert({
        id: formValues.id,
        title: formValues.title,
    }).select().single()

    if (error) {
        return { success: false, message: error.message, timestamp: timestamp(), redirect: redirect }
    }

    revalidatePath(`/notes/${formValues.id}/edit`)
    if (isInsert) {
        redirect = `/notes/${data?.id}/edit`
    }
    return { success: true, message: '', timestamp: timestamp(), redirect: redirect }
}