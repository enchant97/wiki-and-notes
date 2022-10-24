package routes

import (
	"net/http"

	"github.com/enchant97/wiki-and-notes/api/core"
	"github.com/enchant97/wiki-and-notes/api/db"
	"github.com/gin-gonic/gin"
)

func InitRoutes(engine *gin.Engine, config core.AppConfig) {
	engine.Use(AppConfigMiddleware(config))

	engine.POST("/wiki/books/", postBook)
	engine.GET("/wiki/books/", getBooks)
	engine.GET("/wiki/books/:bookID", getBookByID)
	engine.GET("/wiki/books/:bookID/files/", getFilesByBookID)

	engine.POST("/wiki/files/", postFile)
	engine.GET("/wiki/files/:fileID", getFileByID)
}

func postBook(ctx *gin.Context) {
	var bodyValues core.CreateBook
	if err := ctx.ShouldBindJSON(&bodyValues); err != nil {
		ctx.AbortWithStatus(http.StatusBadGateway)
		return
	}
	book := db.Book{
		Title:       bodyValues.Title,
		SystemTitle: bodyValues.SystemTitle,
	}
	if result := db.DB.Create(&book); result.Error != nil {
		ctx.AbortWithError(http.StatusInternalServerError, result.Error)
		return
	}
	ctx.JSON(http.StatusCreated, book)
}

func getBooks(ctx *gin.Context) {
	var books []db.Book
	db.DB.Find(&books)
	ctx.JSON(http.StatusOK, books)
}

func getBookByID(ctx *gin.Context) {
	bookID := ctx.Param("bookID")
	var book db.Book
	if result := db.DB.First(&book, "id = ?", bookID); result.Error != nil {
		ctx.AbortWithError(http.StatusNotFound, result.Error)
		return
	}
	ctx.JSON(http.StatusOK, book)
}

func getFilesByBookID(ctx *gin.Context) {
	bookID := ctx.Param("bookID")
	var files []db.File

	if result := db.DB.Find(&files, "book_id = ?", bookID); result.Error != nil {
		ctx.AbortWithError(http.StatusNotFound, result.Error)
		return
	}
	ctx.JSON(http.StatusOK, files)
}

func postFile(ctx *gin.Context) {
	var bodyValues core.CreateFile
	if err := ctx.ShouldBindJSON(&bodyValues); err != nil {
		ctx.AbortWithStatus(http.StatusBadGateway)
		return
	}
	file := db.File{
		BookID:      bodyValues.BookID,
		Title:       bodyValues.Title,
		SystemTitle: bodyValues.SystemTitle,
		Contents:    bodyValues.Contents,
	}
	if result := db.DB.Create(&file); result.Error != nil {
		ctx.AbortWithError(http.StatusInternalServerError, result.Error)
		return
	}
	ctx.JSON(http.StatusCreated, file)
}

func getFileByID(ctx *gin.Context) {
	fileID := ctx.Param("fileID")
	var file db.File
	if result := db.DB.First(&file, "id = ?", fileID); result.Error != nil {
		ctx.AbortWithError(http.StatusNotFound, result.Error)
		return
	}
	ctx.JSON(http.StatusOK, file)
}
