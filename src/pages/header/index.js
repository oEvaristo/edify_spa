import { AppBar, Typography, Container, Box } from '@mui/material';
import { faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";


function Header() {
    return (
        <AppBar className='barraMenu'>
            <Container>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Typography sx={{ minWidth: 100 }}>
                        <Link to="/" className='link'>
                            <FontAwesomeIcon icon={faBookOpen} className='logo' /> <span className='text_logo'>READING.COM</span>
                        </Link>
                    </Typography>
                    <Link to="/meus_livros" className='link'>
                        <Typography sx={{ minWidth: 200 }} className='text_menu'>Meus Livros</Typography>
                    </Link>
                </Box>
            </Container>
        </AppBar>
    );
}

export default Header;