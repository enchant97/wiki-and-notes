package db

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func InitDB(dbPath string) error {
	database, err := gorm.Open(sqlite.Open(dbPath), &gorm.Config{})

	if err != nil {
		return err
	}

	database.AutoMigrate(&Book{})
	database.AutoMigrate(&File{})

	DB = database
	return nil
}
