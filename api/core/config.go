package core

import (
	"github.com/caarlos0/env/v6"
)

type AppConfig struct {
	Host       string `env:"HOST,notEmpty" envDefault:"127.0.0.1"`
	Port       uint16 `env:"PORT,notEmpty" envDefault:"8080"`
	SQLitePath string `env:"DB_SQLITE_PATH,notEmpty"`
}

func (appConfig *AppConfig) ParseConfig() error {
	if err := env.Parse(appConfig); err != nil {
		return err
	}
	return nil
}
