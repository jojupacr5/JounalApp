import { Box } from "@mui/material"
import { NavBar, SideBar } from "../components";

const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      
      <NavBar drawerWidth={drawerWidth} />
      
      <SideBar drawerWidth={drawerWidth} />

      <Box
        component='main'
        sx={{ flexGrow: 1, px: 3, pb: 3, pt: 10 }}
      >
        {/* TODO: Toolbar */}

        { children }
      </Box>
    </Box>
  )
}