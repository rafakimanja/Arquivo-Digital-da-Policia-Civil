package controllers

import "fmt"

import (
	"adpc/src/database"
	"adpc/src/models"
	"adpc/src/services"
	"net/http"
	"path/filepath"
	"strconv"

	"github.com/gin-gonic/gin"
)

func ExibeTodosDocumentos(c *gin.Context){
	var documentos []models.Documento
	database.DB.Find(&documentos)
	c.JSON(200, documentos)
}

func CriaNovoArquivo(c *gin.Context){
	
	var arquivoObj models.Documento

	nome := c.PostForm("nome")
	categoria := c.PostForm("categoria")
	ano := c.PostForm("ano")
	arquivo, err := c.FormFile("documento")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"erro": "arquivo nao enviado!",
		})
		return
	}

	pasta := services.Diretorio{Caminho: "../arquivos/"+ano+"/"+categoria}

	if !pasta.ValidaCaminho() {
		pasta.CriaPasta()
	}

	nomeNovo := nome+filepath.Ext(arquivo.Filename)

	path := pasta.GetCaminho()+"/"+nomeNovo

	arquivoObj.Nome = nome
	anoInt, _ := strconv.Atoi(ano)
	arquivoObj.Ano = int16(anoInt)
	arquivoObj.Categoria = categoria
	arquivoObj.Arquivo = nomeNovo

	err = c.SaveUploadedFile(arquivo, path)
	database.DB.Create(&arquivoObj)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"msg": "erro no upload do arquivo!",
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Arquivo salvo! "+arquivo.Filename,
	})
}

func BaixaArquivo(c *gin.Context){

	var documento models.Documento

	idArq := c.Params.ByName("id")
	database.DB.First(&documento, idArq)
	

	path := "../arquivos/"+fmt.Sprint(documento.Ano)+"/"+documento.Categoria
	diretorio := services.Diretorio{Caminho: path}

	if diretorio.ValidaCaminho() {

		pathArq := path+documento.Arquivo

		c.Header("Content-Disposition", "attachment; filename="+documento.Arquivo)
		c.Header("Content-Type", "application/octet-stream")
		c.Header("Content-Transfer-Encoding", "binary")
		c.JSON(http.StatusOK, gin.H{
			"arquivo": pathArq,
		})
	} else {
		c.JSON(http.StatusNotFound, gin.H{
			"erro": "path error",
			"message": "Arquivo nao encontrado",
		})
	}
}

func DeletaArquivo(c *gin.Context){
	var documento models.Documento
	id := c.Params.ByName("id")
	result := database.DB.Delete(&documento, id)
	fmt.Println(id)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Erro ao deletar arquivo!"})
	} else {
		c.JSON(http.StatusOK, gin.H{
			"message": "Arquivo deletado com sucesso!"})
		}
}