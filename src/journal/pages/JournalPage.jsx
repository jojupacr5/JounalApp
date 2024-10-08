import { useDispatch, useSelector } from "react-redux"

import { startNewNote } from "../../store/journal/thunks"
import { IconButton } from "@mui/material"
import { AddOutlined } from "@mui/icons-material"

import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../views"


export const JournalPage = () => {

  const {isSaving, active} = useSelector(state => state.journal)
  const dispatch = useDispatch();

  const onClickNewNote = () => {
    dispatch( startNewNote() )
  }

  return (
    <JournalLayout className="animate__animated animate__fadeIn animate__faster">
   
      { 
        (active) 
        ? <NoteView />
        : <NothingSelectedView />
      }

      <IconButton
        disabled={isSaving}
        onClick={onClickNewNote}
        size="large"
        sx={{ color: 'white', backgroundColor: 'error.main', ':hover': { backgroundColor: 'error.main', opacity: 0.9 }, position: 'fixed', right: 50, bottom: 50 }}
      >
        <AddOutlined sx={{ fontSize: 30 }}/>
      </IconButton>
    </JournalLayout>
  )
}