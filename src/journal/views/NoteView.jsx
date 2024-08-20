import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"

import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { SaveOutlined, UploadOutlined } from "@mui/icons-material"
import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css';

import { setActiveNote, startSaveNotes, startUploadingFiles } from "../../store/journal"
import { ImageGallery } from "../components"
import { useForm } from '../../hooks/useForm'

export const NoteView = () => {

  const dispatch = useDispatch();
  const { active:note, messageSaved, isSaving } = useSelector( state => state.journal )
  const { body, title, date, onInputChange, formState } = useForm(note);
  const fileInputRef = useRef();

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

  const onFileInputChange = ({ target }) => {
    if( target.files === 0 ) return;

    console.log('subiendo archivos')
    dispatch( startUploadingFiles(target.files) )
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

        <input 
          type="file"
          multiple
          ref={ fileInputRef }
          onChange={ onFileInputChange }
          style={{ display: 'none' }}
        />

        <IconButton
          color="primary"
          disabled={ isSaving }
          onClick={ () => fileInputRef.current.click() }
        >
          <UploadOutlined />
        </IconButton>

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