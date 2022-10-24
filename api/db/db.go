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

	database.AutoMigrate(&User{})
	database.AutoMigrate(&Shelf{})
	database.AutoMigrate(&Book{})
	database.AutoMigrate(&Page{})
	database.AutoMigrate(&PageContent{})

	DB = database
	return nil
}
