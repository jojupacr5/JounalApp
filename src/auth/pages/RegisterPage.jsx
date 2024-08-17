import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from '../../hooks';

const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [ (value) => value.includes('@'), 'El correo debe tener un @' ],
  password: [ (value) => value.length >= 6, 'El password debe de tener mas de 6 letras' ],
  displayName: [ (value) => value.length >= 1, 'El nombre es obligatorio' ],
}

export const RegisterPage = () => {

  const [formSubmited, setFormSubmited] = useState(false);

  const { 
    displayName, email, password, onInputChange, 
    formState, isFormValid, emailValid, passwordValid,
    displayNameValid 
  } = useForm(formData, formValidations);

  const onSubmit = ( event ) => {
    event.preventDefault();
    setFormSubmited(true)
    console.log(formState)
  }

  return (
    <AuthLayout title="Register">
      <h1>FormValid { isFormValid ? 'Valido' : 'incorrecto' }</h1>
      <form onSubmit={onSubmit}>
        <Grid container>
          <Grid item xs={12} sx={{ mt: 2}}>
            <TextField 
              label="Nombre completo" 
              type="text" 
              placeholder="Jhon Doe"
              fullWidth
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              error={ !!displayNameValid && formSubmited }
              helperText={ displayNameValid }
            />
          </Grid>
          <Grid item xs={12} sx={{ mt: 2}}>
            <TextField 
              label="Correo" 
              type="email" 
              placeholder="Correo@Google.com"
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
              error={ !!emailValid && formSubmited }
              helperText={ emailValid }
            />
          </Grid>

          <Grid item xs={12} sx={{ mt: 2}}>
            <TextField 
              label="Contraseña" 
              type="password" 
              placeholder="Contraseña"
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
              error={ !!passwordValid && formSubmited }
              helperText={ passwordValid }
            />
          </Grid>

          <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
            <Grid item xs={12}>
              <Button type='submit' variant="contained" fullWidth>
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={ RouterLink } color='inherit' to="/auth/login">
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  )
}