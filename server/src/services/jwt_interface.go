package services

import "adpc/src/models"

type Jwt interface {
	CreateToken(usuario models.Usuario) (string, error)
	VerifyToken() ([]byte, error)
}