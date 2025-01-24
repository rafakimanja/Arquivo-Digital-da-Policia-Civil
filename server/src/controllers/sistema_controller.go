package controllers

import (
	"adpc/src/database"
	"adpc/src/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func ExibeConfSistema(c *gin.Context) {
	var configuracoes models.Sistema
	database.DB.Last(&configuracoes)
	c.JSON(http.StatusOK, configuracoes)
}

func SalvaConfSistema(c *gin.Context) {
	var configuracoes models.Sistema

	if err := c.ShouldBindJSON(&configuracoes); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}
	database.DB.Create(&configuracoes)
	c.JSON(http.StatusOK, configuracoes)
}