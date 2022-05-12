import React from 'react';
import axios from 'axios';
import { Container, Rating, Card, CardMedia, Box, CardContent, Typography, Grid, TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from "react-router-dom";
import semimagem from '../../imagem/semimagem.jpg'
import '../../css/index.css';


function GravaLivro(dadosLivro) {

    const [retorno] = React.useState(dadosLivro['dadosLivro']['volumeInfo']);
    const [nota, setValue] = React.useState(5);
    const [botaoCarregando, seBtnCarregando] = React.useState(false);

    const [inicioLeitura, setInicioLeitura] = React.useState('');
    const [fimLeitura, setFimLeitura] = React.useState('');
    const [resenha, setResenha] = React.useState('');   

    function setInicioLeitura_(e) {
        setInicioLeitura(e);
    }

    function setFimLeitura_(e) {
        setFimLeitura(e);
    }

    function setResenha_(e) {
        setResenha(e);
    }

    function salvaLivro() {
        sendRequest();
    }

    let navigate = useNavigate();


    const sendRequest = async () => {

        let id = dadosLivro['dadosLivro']['id'];
        let titulo = retorno['title'] ? retorno['title'] : 'Não Informado';
        let autor = retorno['authors'] ? retorno['authors'].join(", ") : 'Não Informado';
        let pagina = retorno['pageCount'] !== undefined ? retorno['pageCount'] : 'Não Informado';
        let imagems = retorno['imageLinks'] !== undefined ? retorno['imageLinks']['smallThumbnail'] : '';

        seBtnCarregando(true);

        const resolveAfter3Sec = new Promise(resolve => setTimeout(resolve, 3000));
        toast.promise(resolveAfter3Sec,
            {
                pending: 'Salvando Livro ...'
            })

        const dados = {
            cod_livro: id,
            nome: titulo,
            autor: autor,
            paginas: pagina,
            imagem: imagems,            
            data_inicio_leitura: inicioLeitura,
            data_fim_leitura: fimLeitura,
            avaliacao: nota,
            resenha: resenha
        };

        try {
            await axios.post('https://www.oevaristo.com.br/edify_api/public/api/gravalivro', dados);
            toast.success("Gravado com Sucesso !");                   
            return navigate("../meus_livros");
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <Container className='cx_grava_livro'>
            <Card sx={{ display: 'flex' }} className='exibe_livros'>
                <CardMedia
                    component="img"
                    sx={{ width: 150 }}
                    image={retorno['imageLinks'] !== undefined ? retorno['imageLinks']['smallThumbnail'] : semimagem}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Typography component="div" className='titulo_livro'>{retorno['title']}</Typography>
                        <Typography component="div" className='autor'>{retorno['authors'] ? retorno['authors'].join(", ") : 'Autor: Não Informado'}</Typography>
                        <Typography component="div" className='paginas'>Paginas: {(retorno['pageCount'] > 0 ? retorno['pageCount'] : 'Não Informado')}</Typography>
                        <Grid container spacing={2} className="espacoData">
                            <Grid item xs={6}>
                                <Typography component="div" className='dados_livro'>Comecei a Ler :</Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <input type="date" value={inicioLeitura} onChange={e => setInicioLeitura_(e.target.value)} name="inicio" className='form-control' />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography component="div" className='dados_livro'>Terminei de Ler : </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <input type="date" value={fimLeitura} onChange={e => setFimLeitura_(e.target.value)} name="inicio" className='form-control' />
                            </Grid>
                        </Grid>

                        <p className='titulo_livro espacoData'><strong>Sua avaliação</strong></p>

                        <Rating
                            name="hover-feedback"
                            value={nota}
                            precision={1}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />

                    </CardContent>
                </Box>
            </Card>

            <TextField className='margTop cxResenha'
                id="outlined-multiline-static"
                label="Escreva uma Resenha :"
                value={resenha}
                onChange={e => setResenha_(e.target.value)}
                multiline
                rows={4}
            />

            {botaoCarregando === false &&
                <Box className='margTop'>
                    <Button onClick={salvaLivro} variant="contained" className='botao_adicionar'>Cadastrar</Button>
                </Box>
            }
            {botaoCarregando === true &&
                <Box className='margTop'>
                    <Button variant="contained" className='botao_adicionar'>Salvando ...</Button>
                </Box>
            }
        </Container >
    );
}

export default GravaLivro;