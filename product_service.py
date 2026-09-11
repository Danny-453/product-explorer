from product import Product


laptop = Product(1, "Laptop", 1200, "Electronics")
mouse = Product(2, "Mouse", 30, "Electronics")
t_shirt = Product(3, "T-Shirt", 25, "Fashion")
headphones = Product(4, "Headphones", 80, "Electronics")


products = [
    laptop,
    mouse,
    t_shirt,
    headphones
]


def get_products():
    return products


def get_product_by_id(products, product_id):
    for product in products:
        if product.id == product_id:
            return product

    return None


def search_products(products, search_term):
    search_term = search_term.lower()

    return [
        product
        for product in products
        if search_term in product.title.lower()
    ]


def filter_by_category(products, category):
    if category.lower() == "all":
        return products

    return [
        product
        for product in products
        if product.category.lower() == category.lower()
    ]


def get_expensive_products(products, minimum_price):
    return [
        product
        for product in products
        if product.price >= minimum_price
    ]


def calculate_total(products):
    total = 0

    for product in products:
        total += product.price

    return total