package core

type Login struct {
	Username string `binding:"required" json:"username"`
}

type CreateUser struct {
	Username string `binding:"required" json:"username"`
}

type CreateShelf struct {
	// TODO remove OwnerID, we will get from Authorization tokens
	OwnerID     uint   `binding:"required" json:"ownerId"`
	Title       string `binding:"required" json:"title"`
	SystemTitle string `binding:"required" json:"systemTitle"`
}

type CreateBook struct {
	ShelfID     uint   `binding:"required" json:"shelfId"`
	Title       string `binding:"required" json:"title"`
	SystemTitle string `binding:"required" json:"systemTitle"`
}

type CreatePage struct {
	BookID      uint   `binding:"required" json:"bookId"`
	Title       string `binding:"required" json:"title"`
	SystemTitle string `binding:"required" json:"systemTitle"`
}

type ConvertedIDs struct {
	ShelfID uint  `binding:"required" json:"shelfId"`
	BookID  *uint `json:"bookId"`
	PageID  *uint `json:"pageId"`
}

type URLTitleParts struct {
	ShelfTitle string  `binding:"required" json:"shelfTitle"`
	BookTitle  *string `json:"bookTitle"`
	PageTitle  *string `json:"pageTitle"`
}
