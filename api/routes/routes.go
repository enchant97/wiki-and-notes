package routes

import (
	"github.com/enchant97/wiki-and-notes/api/core"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func InitRoutes(engine *gin.Engine, config core.AppConfig) {
	engine.Use(cors.Default())
	engine.Use(AppConfigMiddleware(config))

	usersGroup := engine.Group("/users")
	{
		usersGroup.POST("", postUser)
	}

	shelvesGroup := engine.Group("/shelves")
	{
		shelvesGroup.POST("", postShelf)
		shelvesGroup.GET("", getAllShelves)
		shelvesGroup.GET("/:shelfID", getShelfByID)
		shelvesGroup.DELETE("/:shelfID", deleteShelfByID)
		shelvesGroup.GET("/:shelfID/books", getBooksByShelfID)
	}

	booksGroup := engine.Group("/books")
	{
		booksGroup.POST("", postBook)
		booksGroup.GET("/:bookID", getBookByID)
		booksGroup.DELETE("/:bookID", deleteBookByID)
		booksGroup.GET("/:bookID/books", getPagesByBookID)
	}

	pagesGroup := engine.Group("/pages")
	{
		pagesGroup.POST("", postPage)
		pagesGroup.GET("/:pageID", getPageByID)
		pagesGroup.DELETE("/:pageID", deletePageByID)
		pagesGroup.POST("/:pageID/content", postPageContent)
		pagesGroup.GET("/:pageID/content", getPageContent)
	}
}
