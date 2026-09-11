from flask import Flask, jsonify, render_template, request

from product_service import (
    get_products,
    get_product_by_id,
    search_products,
    filter_by_category,
    calculate_total
)


app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/api/products", methods=["GET"])
def products_api():

    products = get_products()

    return jsonify([
        product.to_dict()
        for product in products
    ])


@app.route("/api/products/<int:product_id>", methods=["GET"])
def product_by_id(product_id):

    products = get_products()

    product = get_product_by_id(products, product_id)

    if product is None:
        return jsonify({
            "error": "Product not found"
        }), 404

    return jsonify(product)


@app.route("/api/products/search", methods=["GET"])
def search_api():

    search_term = request.args.get("q", "")

    products = get_products()

    results = search_products(products, search_term)

    return jsonify(results)


@app.route("/api/products/category", methods=["GET"])
def category_api():

    category = request.args.get("category", "all")

    products = get_products()

    results = filter_by_category(products, category)

    return jsonify(results)


@app.route("/api/products/total", methods=["GET"])
def total_api():

    products = get_products()

    total = calculate_total(products)

    return jsonify({
        "total": total
    })


if __name__ == "__main__":
    app.run(debug=True)