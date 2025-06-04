import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { NavLink } from 'react-router-dom';

export function AccordionUsage ({ title, options, handleClick }) {
  return (
    <div>
      <Accordion
        sx={{
          backgroundColor: 'transparent', // o el color que prefieras
          borderTop: '1px solid gray',
          boxShadow: 'none',
          borderRadius: '0 !important', // Forzamos que se elimine
          '&::before': {
          display: 'none', // elimina la línea divisoria superior que agrega MUI
          },
      }}  
      >
        <AccordionSummary
          sx={{
    
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography sx={{ fontWeight: 600, paddingTop: '5px' }} >{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <div className='flex flex-col gap-y-2 w-full'>
          {
            options?.map(option => {
              return (
                <NavLink 
                  onClick={handleClick}
                  className='bg-zinc-300 p-3 rounded-lg font-medium hover:bg-zinc-400/70 transition ease-in-out duration-300' 
                  key={option.name} to={option.to}>
                  {option.name}
                </NavLink>
              )
            })
          }
        </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
