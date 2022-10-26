package core

import (
	"encoding/base64"
	"errors"

	"github.com/caarlos0/env/v6"
)

type Base64Decoded []byte

func (b *Base64Decoded) UnmarshalText(text []byte) error {
	decoded, err := base64.StdEncoding.DecodeString(string(text))
	if err != nil {
		return errors.New("cannot decode base64 string")
	}
	*b = decoded
	return nil
}

type AppConfig struct {
	Host       string        `env:"HOST,notEmpty" envDefault:"127.0.0.1"`
	Port       uint16        `env:"PORT,notEmpty" envDefault:"8080"`
	Secret     Base64Decoded `env:"B64_SECRET,notEmpty"`
	SQLitePath string        `env:"DB_SQLITE_PATH,notEmpty"`
}

func (appConfig *AppConfig) ParseConfig() error {
	if err := env.Parse(appConfig); err != nil {
		return err
	}
	return nil
}
