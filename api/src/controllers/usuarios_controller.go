package controllers

import (
	"adpc/src/database"
	"adpc/src/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func ExibeTodosUsuarios(c *gin.Context){
	var usuarios []models.Usuario
	database.DB.Find(&usuarios)
	c.JSON(http.StatusOK, usuarios)
}

func CriaNovoUsuario(c *gin.Context){
	var usuario models.Usuario

	if err := c.ShouldBindJSON(&usuario); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	database.DB.Create(&usuario)
	c.JSON(http.StatusOK, usuario)
}

func BuscaUsuario(c *gin.Context){
	var usuario models.Usuario

	id := c.Params.ByName("id")
	database.DB.First(&usuario, id)

	if usuario.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "Usuario nao encontrado!",
		})
		return
	}
	c.JSON(http.StatusOK, usuario)
}

func DeletaUsuario(c *gin.Context){
	var usuario models.Usuario
	id := c.Params.ByName("id")
	result := database.DB.Delete(&usuario, id)

	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Erro ao deletar usuario!"})
	} else {
		c.JSON(http.StatusOK, gin.H{
			"message": "Usuario deletado com sucesso!"})
		}
}

func AtualizaUsuario(c *gin.Context){
	var usuario models.Usuario
	id := c.Params.ByName("id")
	database.DB.First(&usuario, id)

	if err := c.ShouldBindJSON(&usuario); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Erro ao atualizar usuario!"})
		return
	}

	database.DB.Model(&usuario).UpdateColumns(usuario)
	c.JSON(http.StatusOK, gin.H{
		"message": "Usuario atualizado!"})
}