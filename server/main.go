package main

import (
	"adpc/src/models"
	"adpc/src/routes"

	"github.com/gin-gonic/gin"
)

func TesteAPI(c *gin.Context){
	c.JSON(200, gin.H{
		"message": "API do Servidor de Arquivos da Policia Civil",
	})
}

func main(){
	models.Documentos = []models.Documento{
		{Nome: "IP 01.25", Ano: 2025, Categoria: "IP", Arquivo: "IP 01.25.pdf"},
		{Nome: "TC 02.25", Ano: 2025, Categoria: "TC", Arquivo: "TC 02.25.pdf"},
	}

	models.Usuarios = []models.Usuario{
		{Nome: "Admin", RG: "Admin", Senha: "Admin", Admin: true},
		{Nome: "Tuilara", RG: "7033600411", Senha: "Senha@2024", Admin: false},
	}

	models.ConfSistema = models.Sistema{TipoArq: "PDF", UploadUnico: true}

	routes.HandleRequest()
}