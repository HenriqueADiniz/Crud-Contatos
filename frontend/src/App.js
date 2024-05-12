import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Box } from '@mui/material'; // Importações dos componentes do Material-UI
import axios from 'axios'; // Importação do Axios para fazer requisições HTTP

function Contatos() {
  // Declaração dos estados
  const [contatos, setContatos] = useState([]); // Estado para armazenar os contatos
  const [openDialog, setOpenDialog] = useState(false); // Estado para controlar a abertura/fechamento do diálogo
  const [nome, setNome] = useState(''); // Estado para armazenar o nome do contato
  const [endereco, setendereco] = useState(''); // Estado para armazenar o endereço do contato
  const [telefone, setTelefone] = useState(''); // Estado para armazenar o telefone do contato
  const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o termo de pesquisa
  const [contatoIdEditar, setContatoIdEditar] = useState(null); // Estado para armazenar o ID do contato a ser editado

  // Efeito colateral para carregar os contatos ao montar o componente
  useEffect(() => {
    fetchContatos();
  }, []);

  // Função para buscar os contatos
  const fetchContatos = async () => {
    try {
      const response = await axios.get('http://localhost:3001/contatos'); // Requisição para obter os contatos do backend
      setContatos(response.data); // Atualiza o estado com os contatos obtidos
    } catch (error) {
      console.error('Erro ao buscar contatos:', error); // Exibe mensagem de erro no console em caso de falha na requisição
    }
  };

  // Função para abrir o diálogo de adição/editação de contato
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Função para fechar o diálogo de adição/editação de contato
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNome('');
    setendereco('');
    setTelefone('');
    setContatoIdEditar(null);
  };

  // Função para adicionar ou editar um contato
  const handleAddContato = async () => {
    try {
      if (contatoIdEditar) {
        await axios.put(`http://localhost:3001/contatos/${contatoIdEditar}`, { nome, endereco, telefone }); // Requisição para editar o contato existente
      } else {
        await axios.post('http://localhost:3001/contatos', { nome, endereco, telefone }); // Requisição para adicionar um novo contato
      }
      fetchContatos(); // Recarrega a lista de contatos após adição ou edição
      handleCloseDialog(); // Fecha o diálogo
    } catch (error) {
      console.error('Erro ao adicionar/editar contato:', error); // Exibe mensagem de erro no console em caso de falha na requisição
    }
  };

  // Função para excluir um contato
  const handleDeleteContato = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/contatos/${id}`); // Requisição para excluir o contato
      fetchContatos(); // Recarrega a lista de contatos após exclusão
    } catch (error) {
      console.error('Erro ao excluir contato:', error); // Exibe mensagem de erro no console em caso de falha na requisição
    }
  };

  // Função para editar um contato
  const handleEditContato = (contato) => {
    setContatoIdEditar(contato.id);
    setNome(contato.nome);
    setendereco(contato.endereco);
    setTelefone(contato.telefone);
    setOpenDialog(true);
  };

  // Função para atualizar o termo de pesquisa
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <Box m={2}></Box> {/* Espaço vazio antes dos botões */}
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Button variant="contained" onClick={handleOpenDialog}>Adicionar Contato</Button> {/* Botão para abrir o diálogo de adição de contato */}
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField label="Pesquisar Contatos" fullWidth value={searchTerm} onChange={handleSearch} /> {/* Campo de texto para pesquisar contatos */}
        </Grid>
      </Grid>

      {/* Diálogo para adicionar/editar contato */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{contatoIdEditar ? 'Editar Contato' : 'Adicionar Contato'}</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" label="Nome" fullWidth value={nome} onChange={(e) => setNome(e.target.value)} /> {/* Campo de texto para o nome */}
          <TextField margin="dense" label="endereco" fullWidth value={endereco} onChange={(e) => setendereco(e.target.value)} /> {/* Campo de texto para o endereço */}
          <TextField margin="dense" label="Telefone" fullWidth value={telefone} onChange={(e) => setTelefone(e.target.value)} /> {/* Campo de texto para o telefone */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button> {/* Botão para cancelar */}
          <Button onClick={handleAddContato}>{contatoIdEditar ? 'Salvar' : 'Adicionar'}</Button> {/* Botão para adicionar ou salvar o contato */}
        </DialogActions>
      </Dialog>

      {/* Tabela para exibir os contatos */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Endereço</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Mapeamento dos contatos para exibição na tabela */}
            {contatos.filter((contato) => {
              if (searchTerm === "") {
                return contato;
              } else if (contato.nome.toLowerCase().includes(searchTerm.toLowerCase())) {
                return contato;
              }
            }).map((contato) => (
              <TableRow key={contato.id}>
                <TableCell>{contato.nome}</TableCell>
                <TableCell>{contato.endereco}</TableCell>
                <TableCell>{contato.telefone}</TableCell>
                <TableCell>
                  <div style={{ display: 'flex', gap: '8px' }}> {/* Contêiner flexível com espaçamento */}
                    <Button variant="contained" color="primary" onClick={() => handleEditContato(contato)}>Editar</Button> {/* Botão para editar o contato */}
                    <Button variant="contained" color="secondary" onClick={() => handleDeleteContato(contato.id)}>Excluir</Button> {/* Botão para excluir o contato */}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Contatos;
