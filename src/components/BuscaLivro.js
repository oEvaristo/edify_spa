import { useState } from 'react'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TextField, InputAdornment, List, ListItem, Card, CardMedia, Box, CardContent, Typography } from '@mui/material';
import GravaLivro from '../pages/gravaLivro';
import semimagem from '../imagem/semimagem.jpg'
import axios from 'axios'


export const BuscaLivro = () => {
    const [busca, setBusca] = useState('')
    const [exibe, setExibe] = useState('')
    const [arrayLivro, setArrayLivro] = useState([])
    const [result, setResult] = useState([])

    const filtroAltor = ' +intitle';    

    function SelecionaLivro(idBook){
        setBusca('');
        setExibe('S');
        setArrayLivro(idBook);
    }

    const localizar = (busca) => {
        setBusca(busca)
        setExibe('N');

        if (busca.length > 0) {
            axios.get('https://www.googleapis.com/books/v1/volumes?', { params: { q: busca + filtroAltor } })
                .then((response) => {
                    setResult(response.data.items)
                })
        }
    }

    return (
        <div>
            <TextField
                label="Informe o nome do livro:"
                id="idNomeLivro"
                onChange={e => localizar(e.target.value)}
                value={busca}
                sx={{ m: 1, width: '450px' }}
                InputProps={{
                    endAdornment:
                        <InputAdornment position="end">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </InputAdornment>
                }}
            />
            {busca.length > 1 && (
                <Card className='cx_busca_livros'>
                    <List>
                        {
                            result?.map((item, i) => (
                                <ListItem key={i} onClick={e => SelecionaLivro(item)}>

                                    <Card sx={{ display: 'flex' }} className='lista_livros'>
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 70 }}
                                            image={item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.smallThumbnail !== '' ? item.volumeInfo.imageLinks.smallThumbnail : semimagem}
                                            alt={item.volumeInfo.title}
                                        />
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <CardContent sx={{ flex: '1 0 auto' }}>
                                                <Typography component="div" variant="h6">
                                                    {item.volumeInfo.title}
                                                </Typography>
                                                <Typography variant="h7" color="text.secondary" component="div">
                                                    {item.volumeInfo.authors?.join(", ") ? item.volumeInfo.authors?.join(", ") : "Autor: Não informado"}
                                                </Typography>
                                                <Typography component="div" color="text.secondary" variant="subtitle1" >
                                                    {item.volumeInfo.publishedDate?.substring(0, 4) ? item.volumeInfo.publishedDate?.substring(0, 4) : "Ano: Não informado"}
                                                </Typography>
                                            </CardContent>
                                        </Box>
                                    </Card>
                                </ListItem>
                            ))
                        }
                    </List>
                </Card>
            )}
            {exibe === 'S' &&
                <GravaLivro dadosLivro={arrayLivro} />
            }
        </div>
    )
}