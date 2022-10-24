package db

import (
	"time"

	"gorm.io/gorm"
)

type BaseModel struct {
	ID        uint           `gorm:"primarykey" json:"id"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"deletedAt"`
}

type Book struct {
	BaseModel
	Title       string `gorm:"not null" json:"title"`
	SystemTitle string `gorm:"unique;not null" json:"systemTitle"`
	Files       []File `json:"-"`
}

type File struct {
	BaseModel
	BookID      uint   `gorm:"not null" json:"bookId"`
	Book        Book   `gorm:"foreignKey:BookID" json:"-"`
	Title       string `gorm:"not null" json:"title"`
	SystemTitle string `gorm:"unique;not null" json:"systemTitle"`
	Contents    string `gorm:"not null" json:"contents"`
}
