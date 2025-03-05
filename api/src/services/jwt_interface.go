package services

import (
	"adpc/src/models"
)

type Jwt interface {
	CreateToken(models.Usuario) (string, error)
	VerifyToken(string) (bool)
}