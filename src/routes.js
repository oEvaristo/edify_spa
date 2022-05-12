import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Header from './pages/header';
import Conteudo from './pages/content';
import AddLivro from './pages/addLivro';
import MeusLivros from './pages/meusLivros';
import 'react-toastify/dist/ReactToastify.css';

function RoutesApp() {
    return (
        <BrowserRouter>
            <ToastContainer autoClose={3000} />
            {<Header />}
            <Routes>
                <Route path="/" element={<Conteudo />}></Route>
                <Route path="/adicionar_livro" element={<AddLivro />}></Route>
                <Route path="/meus_livros" element={<MeusLivros />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;