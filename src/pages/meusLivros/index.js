import { React, useEffect, useState } from 'react';
import { Container, Rating, Typography, List, ListItem, Card, CardMedia, Box, CardContent, CircularProgress } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios';
import semimagem from '../../imagem/semimagem.jpg'
import '../../css/index.css';

function MeusLivros() {

    const [result, setResult] = useState([])
    const [carregando, setCarregando] = useState('')
    const [ocultaCaixa, setOcultaCaixa] = useState('none')    

    useEffect(() => {
        sendRequest();
    }, []);

    function sendRequest() {

        axios.get('https://www.oevaristo.com.br/edify_api/public/api/listalivro')
            .then((response) => {
                setResult(response.data)
                setCarregando('none')
                setOcultaCaixa('')
            })
    }

    function formatData(data) {
        if (data !== null) {
            let data_br = data.split('-').reverse().join('/');
            return data_br;
        }
    }

    return (
        <Container className='cx_conteudo'>
            <Box sx={{ textAlign: 'center', marginTop: '150px', display: carregando }}>
                <CircularProgress />
            </Box>
            <Card className='cx_exibe_livros' sx={{ display: ocultaCaixa }}>

                <List>
                    {result.map((item, i) =>

                        <ListItem key={item.id}>

                            <Card sx={{ display: 'flex' }} className='lista_livros'>
                                <CardMedia
                                    component="img"
                                    sx={{ width: 70 }}
                                    image={item.imagem !== '' ? item.imagem : semimagem}
                                />
                                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Typography component="div" variant="h6">
                                            {item.nome}
                                        </Typography>
                                        <Typography variant="h7" color="text.secondary" component="div">
                                            Autor: {item.autor}
                                        </Typography>
                                        <Rating
                                            name="hover-feedback"
                                            value={item !== undefined ? item.avaliacao : 0}
                                            readOnly={true}
                                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                                        />
                                        <Typography component="div" className='autor'>Inicio Leitura: {formatData(item.data_inicio_leitura)}</Typography>
                                    </CardContent>
                                </Box>
                            </Card>
                        </ListItem>

                    )}
                </List>

            </Card>
        </Container >
    );
}

export default MeusLivros;