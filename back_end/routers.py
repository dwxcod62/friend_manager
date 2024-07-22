from app import app, db
from flask import jsonify, request
from models import Friend


# Get All Friends
@app.route("/api/friends", methods=["GET"])
def get_friends():
    friends = Friend.query.all()
    result = [friend.to_json() for friend in friends]
    return jsonify(result)


# Get Create Friend
@app.route("/api/friends", methods=["POST"])
def create_friend():
    REQUIRED_FIELDS = ["name", "role", "description", "gender"]

    try:
        data = request.json

        # CHECK FIELD IS EXIST
        for field in REQUIRED_FIELDS:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400

        # Get variables
        name = data.get("name")
        role = data.get("role")
        description = data.get("description")
        gender = data.get("gender")

        # Fetch avatar image
        if gender == "male":
            img_url = f"https://avatar.iran.liara.run/public/boy?username={name}"
        elif gender == "female":
            img_url = f"https://avatar.iran.liara.run/public/girl?username={name}"
        else:
            img_url = None

        # Create new Friend
        new_friend = Friend(
            name=name,
            role=role,
            description=description,
            gender=gender,
            img_url=img_url,
        )

        # Add to db
        db.session.add(new_friend)
        db.session.commit()

        return jsonify({"msg": "Successfully"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# Get Delete Friend
@app.route("/api/friends/<int:id>", methods=["DELETE"])
def delete_friend(id: int):
    try:
        friend = Friend.query.get(id)
        if friend is None:
            return jsonify({"error": "Friend not found"}), 400

        db.session.delete(friend)
        db.session.commit()

        return jsonify({"msg": "Successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# Get Update Friend
@app.route("/api/friends/<int:id>", methods=["PATCH"])
def update_friend(id: int):
    try:
        friend: Friend = Friend.query.get(id)
        if friend is None:
            return jsonify({"error": "Friend not found"}), 400

        data = request.json

        friend.name = data.get("name", friend.name)
        friend.description = data.get("description", friend.description)
        friend.role = data.get("role", friend.role)
        friend.gender = data.get("gender", friend.gender)

        db.session.commit()

        return jsonify({"msg": "Successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


# Get Friend
@app.route("/api/friend/<int:id>", methods=["GET"])
def get_friend(id: int):
    try:
        friend: Friend = Friend.query.get(id)
        if friend is None:
            return jsonify({"error": "Friend not found"}), 400

        return jsonify(friend.to_json()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
