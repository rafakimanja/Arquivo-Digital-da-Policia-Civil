package controllers

import (
	"adpc/src/models"

	"github.com/gin-gonic/gin"
)

func ExibeTodosDocumentos(c *gin.Context){
	c.JSON(200, models.Documentos)
}