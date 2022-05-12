import { Container, Button, Grid } from '@mui/material';
import { Link } from "react-router-dom";
import MeusLivros from '../meusLivros';
import '../../css/index.css';

function Conteudo() {
    return (
        <Container>
            <Grid container>
                <Grid item xs={3} className='cx_conteudo'>
                    <Link to="/adicionar_livro" className='link'>
                        <Button variant="contained" className='botao_adicionar'>Adicionar Livro</Button>
                    </Link>
                </Grid>
                <Grid item xs={9}>
                    <MeusLivros />
                </Grid>
            </Grid>
        </Container >
    );
}

export default Conteudo;