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

type User struct {
	BaseModel
	Username string `gorm:"unique;not null" json:"username"`
}

type Shelf struct {
	BaseModel
	OwnerID     uint   `gorm:"not null" json:"ownerId"`
	Owner       User   `gorm:"foreignKey:OwnerID" json:"-"`
	Title       string `gorm:"not null" json:"title"`
	SystemTitle string `gorm:"unique;not null" json:"systemTitle"`
}

type Book struct {
	BaseModel
	ShelfID     uint   `gorm:"uniqueIndex:idx_books;not null" json:"shelfId"`
	Shelf       Shelf  `gorm:"foreignKey:ShelfID" json:"-"`
	Title       string `gorm:"not null" json:"title"`
	SystemTitle string `gorm:"uniqueIndex:idx_books;not null" json:"systemTitle"`
}

type Page struct {
	BaseModel
	BookID      uint   `gorm:"uniqueIndex:idx_pages;not null" json:"bookId"`
	Book        Book   `gorm:"foreignKey:BookID" json:"-"`
	Title       string `gorm:"not null" json:"title"`
	SystemTitle string `gorm:"uniqueIndex:idx_pages;not null" json:"systemTitle"`
}

// FIXME Content should be binary data (bytes)
type PageContent struct {
	PageID  uint   `gorm:"primarykey" json:"pageId"`
	Page    Page   `gorm:"foreignKey:PageID" json:"-"`
	Content string `gorm:"not null" json:"content"`
}
