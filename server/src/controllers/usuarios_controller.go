package controllers

import (
	"adpc/src/models"

	"github.com/gin-gonic/gin"
)

func ExibeTodosUsuarios(c *gin.Context){
	c.JSON(200, models.Usuarios)
}