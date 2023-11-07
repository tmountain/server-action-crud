'use server'

import { createSvcClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

export async function upsertNote(formData: FormData) {
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
        return { success: false, error: parseResult.error.message }
    }
    const formValues = parseResult.data
    const isInsert = !formValues.id

    const { data, error } = await supabase.from('notes').upsert({
        id: formValues.id,
        title: formValues.title,
    }).select().single()

    if (error) {
        return { success: false, error: error.message }
    }

    revalidatePath(`/notes/${formValues.id}/edit`)
    if (isInsert) {
        return redirect(`/notes/${data?.id}/edit`)
    }
}