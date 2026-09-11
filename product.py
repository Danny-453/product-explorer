class Product:

    def __init__(self, id, title, price, category):
        self.id = id
        self.title = title
        self.price = price
        self.category = category

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "price": self.price,
            "category": self.category
        }