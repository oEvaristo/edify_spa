import { useState } from 'react'
import { Container } from '@mui/material';
import { BuscaLivro } from '../../components/BuscaLivro.js'

import '../../css/index.css';

function AddLivro() {
    return (
        <Container className='cx_conteudo'>
            <BuscaLivro />
        </Container >
    );
}

export default AddLivro;