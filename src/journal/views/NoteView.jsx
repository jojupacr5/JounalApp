import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Button, Grid, TextField, Typography } from "@mui/material"
import { SaveOutlined } from "@mui/icons-material"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css';

import { setActiveNote, startSaveNotes } from "../../store/journal"
import { ImageGallery } from "../components"
import { useForm } from '../../hooks/useForm'

export const NoteView = () => {

  const dispatch = useDispatch();
  const { active:note, messageSaved, isSaving } = useSelector( state => state.journal )
  const { body, title, date, onInputChange, formState } = useForm(note);

  const dateString = useMemo(() => {
    const newDate = new Date(date)

    return newDate.toUTCString();
  }, [date])

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Nota actualizada', messageSaved, 'success');
    }
  }, [messageSaved]);

  useEffect(() => {
    dispatch( setActiveNote(formState) )
  }, [formState]);

  const onSaveNote = () => {
    dispatch(startSaveNotes());
  }

  return (
    <Grid container
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">{dateString}</Typography>
      </Grid> 
      <Grid item>
        <Button 
          color="primary" 
          sx={{ padding: 2 }}
          onClick={onSaveNote}
          disabled={isSaving}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type="text"
          variant="standard"
          fullWidth
          placeholder="Ingrese un título"
          label="Title"
          sx={{ mb: 1, border: 'none' }}
          name="title"
          value={ title }
          onChange={ onInputChange }
        />

        <TextField
          type="text"
          variant="standard"
          fullWidth
          multiline
          placeholder="¿Qué sucedió en el día de hoy?"
          minRows={ 5 }
          name="body"
          value={ body }
          onChange={ onInputChange }
        />
      </Grid>

      <ImageGallery />
    </Grid>
  )
}