package models

type Usuario struct {
	Nome  string `json:"nome"`
	RG    string `json:"rg"`
	Senha string `json:"senha"`
	Admin bool   `json:"admin"`
}

var Usuarios []Usuario