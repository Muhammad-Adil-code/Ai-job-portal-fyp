from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

model = joblib.load('job_placement_model.pkl')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        
        age = int(data['age'])
        gender = data['gender']
        stream = data['stream']
        internships = int(data['internships'])
        # Convert CGPA from 4-point scale to 10-point scale
        cgpa_4_scale = float(data['cgpa'])
        cgpa_10_scale = (cgpa_4_scale / 4) * 10  # Convert to 10-point scale
        history_of_backlogs = int(data['history_of_backlogs'])

        gender_encoded = 1 if gender == 'Male' else 0
        stream_mapping = {
            'Civil': 0,
            'Computer Science': 1,
            'Electrical': 2,
            'Electronics And Communication': 3,
            'Information Technology': 4,
            'Mechanical': 5
        }
        stream_encoded = stream_mapping.get(stream, -1)

        if stream_encoded == -1:
            return jsonify({
                'success': False,
                'error': "Invalid stream selected."
            }), 400

        input_features = np.array([[age, gender_encoded, stream_encoded, internships, cgpa_10_scale, history_of_backlogs]])

        prediction = model.predict(input_features)
        probability = model.predict_proba(input_features)[0]

        result = "The student is likely to be placed." if prediction[0] == 1 else "The student is unlikely to be placed."
        
        return jsonify({
            'success': True,
            'prediction': int(prediction[0]),
            'result': result,
            'probability': float(probability[1]) if prediction[0] == 1 else float(probability[0])
        })

    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)
