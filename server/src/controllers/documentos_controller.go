package controllers

import (
	"adpc/src/models"
	"adpc/src/services"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func ExibeTodosDocumentos(c *gin.Context){
	c.JSON(200, models.Documentos)
}

func CriaNovoArquivo(c *gin.Context){	

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

	path := pasta.GetCaminho()+"/"+arquivo.Filename

	err = c.SaveUploadedFile(arquivo, path)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"msg": "erro no upload do arquivo!",
			"error": err.Error(),
		})
		return
	}

	fmt.Println(nome+" | "+categoria+" | "+ano+" | "+arquivo.Filename)
	
	c.JSON(http.StatusOK, gin.H{
		"message": "Arquivo salvo! "+arquivo.Filename,
	})
}