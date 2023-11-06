import NoteEditor from "../../NoteEditor"

export default async function Page({
    params
}: {
    params: { id: string }
}) {
    return <NoteEditor noteID={parseInt(params.id)} />
}