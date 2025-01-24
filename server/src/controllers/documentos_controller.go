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
	c.JSON(http.StatusOK, documentos)
}

func CriaNovoArquivo(c *gin.Context){

	nome := c.PostForm("nome")
	categoria := c.PostForm("categoria")
	ano := c.PostForm("ano")
	documento, err := c.FormFile("documento")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"erro": "arquivo nao enviado!",
		})
		return
	}

	anoInt, _ := strconv.Atoi(ano)
	arquivo := models.Documento{Nome: nome, Ano: anoInt, Categoria: categoria, Arquivo: nome+filepath.Ext(documento.Filename)}

	gerenciador := services.Construtor()
	_, path := gerenciador.SalvaArquivo(arquivo)

	pathDocumento := path+"/"+arquivo.Arquivo
	err = c.SaveUploadedFile(documento, pathDocumento)
	database.DB.Create(&arquivo)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "erro no upload do arquivo!",
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Arquivo salvo! "+documento.Filename})
}

func BaixaArquivo(c *gin.Context){

	var documento models.Documento

	idArq := c.Params.ByName("id")
	database.DB.First(&documento, idArq)

	if documento.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Arquivo nao encontrado!"})
		return 
	}
	
	path := "../arquivos/"+fmt.Sprint(documento.Ano)+"/"+documento.Categoria+"/"+documento.Arquivo

	c.Header("Content-Disposition", "attachment; filename="+documento.Arquivo)
	c.Header("Content-Type", "application/octet-stream")
	c.Header("Content-Transfer-Encoding", "binary")
	c.JSON(http.StatusOK, gin.H{
		"arquivo": path,
	})
}

func DeletaArquivo(c *gin.Context){
	var documento models.Documento
	id := c.Params.ByName("id")
	database.DB.First(&documento, id)

	if documento.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Arquivo nao encontrado!"})
		return 
	}

	gerenciador := services.Construtor()

	if !gerenciador.DeletaArquivo(documento, false) {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Erro ao deletar arquivo!"})
		return
	}

	result := database.DB.Delete(&documento, id)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Erro ao deletar arquivo!"})
		return
	}

	if !gerenciador.DeletaArquivo(documento, true) {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Erro ao deletar arquivo!"})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{
		"message": "Arquivo deletado com sucesso!"})
	
}

func AtualizaArquivo(c *gin.Context){
	var documento models.Documento
	id := c.Params.ByName("id")
	database.DB.First(&documento, id)

	if documento.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Arquivo nao encontrado!"})
		return
	}

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

	anoInt, _ := strconv.Atoi(ano)
	documentoAtt := models.Documento{Nome: nome, Ano: int(anoInt), Categoria: categoria, Arquivo: nome+filepath.Ext(arquivo.Filename)}

	gerenciador := services.Construtor()
	
	if !gerenciador.AtualizarArquivo(documento, documentoAtt) {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Erro ao atualizar arquivo!"})
		return
	}

	if err := database.DB.Model(&documento).Updates(documentoAtt).Error; err != nil{
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Erro ao atualizar arquivo! "+err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "Arquivo atualizado!"})
}