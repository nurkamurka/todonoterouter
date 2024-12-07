import { useState } from "react"
import { nanoid } from "nanoid"
import { NotebookList } from "../NoteBookList/NoteBookList"
import { Link, useLoaderData } from "react-router-dom"
import s from "./NoteBookInput.module.css"

export async function loader() {
    let arr

    if (localStorage.getItem("Note")) {
        arr = JSON.parse(localStorage.getItem("Note"))
    } else {
        arr = []
    }

    return { arr }
}

export const NoteBookInput = () => {
    let { arr } = useLoaderData()
    const [notes, setNotes] = useState(arr)
    const [valueInput, setValueInput] = useState("")
    const [valueText, setValueText] = useState("")

    const handleClickAdd = () => {
        if (!valueText.trim() || !valueInput.trim() === "") {
            alert("нада заполнить все поля^^")
        } else {
            const newNote = {
                id: nanoid(),
                topTitle: valueInput,
                botTitle: valueText,
                isEditTop: false,
                isEditBot: false,
            }

            let copy = [...notes, newNote]
            setNotes(copy)
            setValueInput("")
            setValueText("")

            localStorage.setItem("Note", JSON.stringify(copy))
        }
    }

    return (
        <div className={s.container}>
            <Link to={"/"}><button className={s.btnLink}>TODO LIST</button></Link>
            <input placeholder="введите заголовочек" className={s.input} value={valueInput} onChange={e => setValueInput(e.target.value)} type="text" />
            <textarea placeholder="введите заметочку" className={s.textarea} value={valueText} onChange={e => setValueText(e.target.value)} name="" id="" />
            <button className={s.btn} onClick={() => handleClickAdd()}>добавить заметочку</button>
            <div>
                <NotebookList notes={notes}
                    isSetValueInput={setValueInput} isSetValueText={setValueText} isSetNotes={setNotes}
                />
            </div>
        </div>
    )
}