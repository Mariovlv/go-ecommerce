package initializers

import (
	"github.com/mariovlv/go-commerce/models"
)

func SyncDatabase() {
	DB.AutoMigrate(&models.User{})
}
