import os
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Para pruebas puedes dejar "*".
# En producción es mejor poner aquí la URL real de Cloudflare Pages.
CORS(app, resources={
    r"/api/*": {
        "origins": os.environ.get("FRONTEND_URL")
    }
})


@app.route("/", methods=["GET"])
def inicio():
    return jsonify({
        "mensaje": "Backend de suma funcionando"
    })


@app.route("/api/sumar", methods=["POST"])
def sumar():
    try:
        datos = request.get_json()

        a = float(datos.get("a"))
        b = float(datos.get("b"))

        resultado = a + b

        return jsonify({
            "a": a,
            "b": b,
            "resultado": resultado
        })

    except (TypeError, ValueError, AttributeError):
        return jsonify({
            "error": "Debes enviar dos números válidos"
        }), 400


if __name__ == "__main__":
    puerto = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=puerto)
