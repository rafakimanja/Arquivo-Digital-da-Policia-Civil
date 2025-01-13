package models

type Sistema struct {
	TipoArq     string `json:"tipo_arq"`
	UploadUnico bool   `json:"upload_unico"`
}

var ConfSistema Sistema