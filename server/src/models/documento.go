package models

import "gorm.io/gorm"

type Documento struct {
	gorm.Model
	Nome      string `json:"nome"`
	Ano       int16  `json:"ano"`
	Categoria string `json:"categoria"`
	Arquivo   string `json:"arquivo"`
}

var Documentos []Documento