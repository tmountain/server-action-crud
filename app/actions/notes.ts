'use server'

import { createSvcClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation'

function getStringValue(value: FormDataEntryValue| null): string|undefined {
    return typeof value === 'string' ? value : undefined;
}

function getNumberValue(value: FormDataEntryValue | null): number | undefined {
    if (typeof value === 'string' && value.trim() === '') {
        return undefined;
    }
    const numberValue = Number(value);
    // Check if the conversion resulted in a valid number and it's not NaN
    return Number.isFinite(numberValue) ? numberValue : undefined;
}

export async function upsertNote(formData: FormData) {
    const cookieStore = cookies()
    const supabase = createSvcClient(cookieStore)
    const origValue = formData.get('id')
    const id = getNumberValue(formData.get('id'))

    const { data, error } = await supabase.from('notes').upsert({
        id: id,
        title: getStringValue(formData.get('title'))
    }).select().single()

    if (error) {
        return { success: false, error: error.message }
    }
    revalidatePath(`/notes/${id}/edit`)
    redirect(`/notes/${data?.id}/edit`)
}
