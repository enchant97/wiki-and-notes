package core

type CreateBook struct {
	Title       string `binding:"required" json:"title"`
	SystemTitle string `binding:"required" json:"systemTitle"`
}

type CreateFile struct {
	BookID      uint   `binding:"required" json:"bookId"`
	Title       string `binding:"required" json:"title"`
	SystemTitle string `binding:"required" json:"systemTitle"`
	Contents    string `binding:"required" json:"contents"`
}
